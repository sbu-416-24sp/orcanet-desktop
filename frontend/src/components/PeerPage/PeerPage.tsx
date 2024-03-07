import { motion } from "framer-motion";
import { routeVariants } from "../../helper/RouterAnimation";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";
import { useState, useEffect, useRef } from "react";
import { useWindowSize } from "../../helper/CustomHooks";
import DataTable from "../ui/data-table";
import { Button } from "../ui/button";
import { peerData } from "./PeerData";
import { columns } from "./PeerColumns";
import { ChevronDoubleUp, ChevronDoubleDown } from "react-bootstrap-icons";
import SpaceBackground from "../../images/space-bg.jpg";

function TableSwitch() {

    const [open, setOpen]: [
      boolean,
      React.Dispatch<React.SetStateAction<boolean>>
    ] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="animate__animated animate__rollIn rounded-full h-16 w-16 absolute bottom-16 right-16 hover:bg-gray-800 hover:text-white transition durantion-1000"
        onClick={() => setOpen(!open)}
      >
        {!open ? <ChevronDoubleUp /> : <ChevronDoubleDown />}
      </Button>

      {open && (
        <DataTable
          style={
            "animate__animated animate__fadeInUp bg-neutral-900 text-white w-3/4 absolute bottom-16 border-black overflow-auto max-h-80 no-scrollbar"
          }
          columns={columns}
          data={peerData}
        />
      )}
    </>
  );
}

export default function PeerPage() {
  const globeRef = useRef<GlobeMethods>(),
    [width, height]: number[] = useWindowSize();

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1;
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 1.85 });
    }
  }, []);

  return (
    <motion.div
      // className="content peer-page"
      className="h-full w-full bg-blue-100 bg-opacity-50 relative flex justify-center overflow-hidden"
      initial="initial"
      animate="final"
      variants={routeVariants}
    >
      <ReactGlobe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl={SpaceBackground}
        animateIn={true}
        width={width}
        height={height}
        labelsData={peerData.map((item) => {
          return {
            lat: item.lat,
            lng: item.long,
            location: item.location,
            id: item.peerId,
          };
        })}
        onLabelClick={() => alert("Label clicked")}
        labelText={"location"}
        labelSize={1}
        labelDotRadius={1}
        labelAltitude={0.02}
        labelColor={() => "#FFFF00"}
      />

      <TableSwitch />
    </motion.div>
  );
}
