import { CircleDollarSign, Info, TrendingDown, TrendingUp } from "lucide-react";
import InfoCardContainer from "../card/InfoCardContainer";

export default function WalletInfoCards() {
  const cardInfoList = [
    {
      icon: <CircleDollarSign />,
      title: "Current Balance",
      text: "100.00 ORC",
      cardStyle: "bg-stone-950 text-white",
      iconStyle: "bg-stone-800",
    },
    {
      icon: <Info />,
      title: "Wallet ID",
      text: "13hgriwdGXvPyWFABDX6QByyxvN8cWCgDp",
      iconStyle: "bg-indigo-300",
    },
    {
      icon: <TrendingUp />,
      title: "Monthly Earning",
      text: "100.00 ORC",
      iconStyle: "bg-teal-300",
    },
    {
      icon: <TrendingDown />,
      title: "Monthly Spending",
      text: "0.00 ORC",
      iconStyle: "bg-rose-300",
    },
  ];

  return <InfoCardContainer cardInfoList={cardInfoList} />;
}
