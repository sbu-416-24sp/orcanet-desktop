import OrcaCoin from "../../svgs/orcaCoin.svg";
// import SideBarLogo from "../../svgs/OrcaNetLogo.tsx";

export default function UserInfoPanel() {
  return (
    <div className="bg-gray-50 p-12 h-full">
      <div className="info animate__animated animate__fadeInDown">
        <h3 className="text-2xl font-semibold">Node Connected</h3>
        <div className="flex items-center pt-4">
          <h3 className="font-semibold mr-2 text-2xl">Balance:</h3>
          <span className="flex items-center">
            <img src={OrcaCoin} alt="Orca Coin" className="h-5 w-5 mr-1" />
            <span className="text-cyan-800 font-bold">1024.576</span>
          </span>
        </div>
        <div className="pt-16">
          <h3 className="font-semibold text-2xl">Peer ID:</h3>
          <p className="text-cyan-800 font-bold break-all m-0">
            12D3KooWM1J3AZKnEvVtEVjwFka2Z2Z9EZo5XVzUoyrAofWRUUWK
          </p>
        </div>
        <div className="pt-4">
          <h3 className="font-semibold text-2xl">Public Key:</h3>
          <p className="text-cyan-800 font-bold break-all m-0">
            CAESIKY9RkdcwVuPzyQPn2SX7CEJRIj87Y1Mxtm0S5ABQMvI
          </p>
        </div>
        <div className="pt-16">
          <h3 className="font-semibold text-2xl">Gateway:</h3>
          <a className="text-cyan-800 font-bold break-all m-0">
            http://127.0.0.1:8080
          </a>
        </div>
      </div>
      {/* <div className="mt-8 md:mt-12 ">
        <SideBarLogo fill="#12486b" />
      </div> */}
    </div>
  );
}
