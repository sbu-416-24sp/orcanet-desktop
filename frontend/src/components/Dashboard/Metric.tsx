// import Traffic from "../../images/netTraffic.png";
// import Bandwidth from "../../images/bandwidthGraph.png";
import Header from "../Header/Header";
import Traffic from "./Traffic.tsx";
import Bandwidth from "./Bandwidth.tsx";

// function Graph({
//   className,
//   title,
//   graph,
// }: {
//   className: string;
//   title: string;
//   graph: string;
// }) {
//   return (
//     <div className={className}>
//       <h3>{title}</h3>
//       <img src={graph} alt="Network Data" />
//     </div>
//   );
// }

export default function Metric() {
  return (
    <div className="px-8 pt-8 bg-blue-100 bg-opacity-50 h-full">
      <Header />
      {/* <Graph
        className="bandwidth-graph"
        title="BANDWIDTH OVER TIME"
        graph={Bandwidth}
      /> */}
      {/* <Graph
        className="traffic-meter"
        title="TRAFFIC OVER TIME"
        graph={Traffic}
      /> */}
      <div className="animate__animated animate__fadeInUp">
        <Bandwidth />
      </div>
      <div className="max-[1000px]:collapse pt-8 animate__animated animate__fadeInUp">
        <Traffic />
      </div>
    </div>
  );
}
