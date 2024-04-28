import { CircleDollarSign, Zap, HandCoins, Cpu } from "lucide-react";
import MiningDevices from "./MiningDevices";
import InfoCardContainer from "../card/InfoCardContainer";

function MiningDashBoard() {
  const cardInfoList = [
    {
      icon: <CircleDollarSign />,
      title: "Balance",
      text: "100.00 ORC",
      cardStyle: "bg-stone-950 text-white",
      iconStyle: "bg-stone-800",
    },
    {
      icon: <Zap />,
      title: "Hash Power",
      text: "175.24 MH/s",
      iconStyle: "bg-yellow-300",
    },
    {
      icon: <HandCoins />,
      title: "Unpaid Balance",
      text: "3.65 ORC",
      extraInfo: (
        <p className="w-full break-words font-mono text-gray-500 mt-2">
          Next Payout: 3h28m
        </p>
      ),
      iconStyle: "bg-teal-300",
    },
    {
      icon: <Cpu />,
      title: "Devices Mining",
      text: "4/5",
      iconStyle: "bg-rose-300",
    },
  ];

  return <InfoCardContainer cardInfoList={cardInfoList} />;
}

const MiningPage = () => {
  return (
    <div id="mining-page" className="flex flex-col grow size-full text-black">
      <div className="size-full p-10 overflow-y-auto">
        <MiningDashBoard />
        <MiningDevices />
      </div>
    </div>
  );
};

export default MiningPage;
