import { useEffect, useState, useMemo } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Sphere,
    Graticule,
} from "react-simple-maps";
import MarkerDialog from './MarkerDialog';
import "./peers-page.css";
import { scaleLinear } from "d3-scale";
import sortBy from "lodash/sortBy";
import geoData from "./features.json";
import mapData  from "./data.json";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import fakeSeeds from "./fakeSeeds";
import MarkerPoints from './MarkerPoints';

type MapData = {
  rank: number;
  country_code: number;
  country: string;
  city_code: number;
  city: string;
  lat: number;
  lng: number;
  population: number;
}

const RadialGradient = () => (
  <svg width="0" height="0">
    <defs>
      <pattern
        id="radialPattern"
        patternUnits="userSpaceOnUse"
        width="5"
        height="5"
      >
        <circle cx="5" cy="5" r="2" fill="gray" />
      </pattern>
    </defs>
  </svg>
);

const PeersPage = () => {
  const [data, setData] = useState<MapData[]>([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
  try{
    const sortedCities = sortBy(mapData.data, (o: MapData) => -o.population);
      setMaxValue(sortedCities[0].population);
      setData(sortedCities);
  } catch(err:any){
    console.log("err-", err);
  }
  }, []);

  const popScale = useMemo(
    () => scaleLinear().domain([0, maxValue]).range([0, 24]),
    [maxValue]
  );

  return (
    <div className="p-2 pb-0 block w-auto overflow-y-scroll">
      <div id="peers-page" className="container p-8 pt-0 pl-12 justify-self-center">
        <RadialGradient />
        <ComposableMap>
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} fill="transparent" id="sphere"/>
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          <Geographies geography={geoData}>
            {({ geographies }:  {geographies: any[]}) => {
                return geographies.map((geo: any) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "url(#radialPattern)", // Apply the radial gradient as fill
                        stroke: "#FFF", // Add stroke if needed
                        strokeWidth: 0.5,
                      },
                      hover: {
                        fill: "#2a354d",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                ))
            }
              
            }
          </Geographies>

          {data.map(({ city_code, lng, lat, population }: MapData) => {
            return (
              <MarkerDialog
                key={city_code}
                lng={lng}
                lat={lat}
                city_code={city_code} 
                popScale={popScale}
                population={population}
              />
            );
          })}
        </ComposableMap>
        

       <h1 className="text-center text-3xl">900</h1>
       <h1 className="text-center font-bold text-gray-400 text-base">PEERS</h1>
        
        <MarkerPoints />

       <div className="mt-9 w-auto">
          <DataTable columns={columns} data={fakeSeeds} />
       </div>

      </div>
    
    </div>
  );
};

export default PeersPage;