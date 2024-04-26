import { CircleDollarSign, Info, TrendingDown, TrendingUp } from "lucide-react";

interface IconContainerProps {
  icon: JSX.Element;
  iconStyle?: string;
}

interface WalletInfoCardProps {
  icon: JSX.Element;
  title: string;
  text: string;
  cardStyle?: string;
  iconStyle?: string;
}

function IconContainer({ icon, iconStyle }: IconContainerProps) {
  return (
    <div className="flex items-center h-full">
      <div className={`p-3 ${iconStyle} rounded-lg size-fit`}>{icon}</div>
    </div>
  );
}

function WalletInfoCard({
  icon,
  title,
  text,
  cardStyle = "bg-white",
  iconStyle = "bg-white",
}: WalletInfoCardProps) {
  let className = "font-semibold break-words w-full";
  let textContainer = <p className={className}>{text}</p>;

  if (title === "Wallet ID") {
    className +=
      " cursor-pointer underline hover:text-indigo-500 transition-all duration-500";
    textContainer = (
      <p
        className={className}
        onClick={() => navigator.clipboard.writeText(text)}
      >
        {text}
      </p>
    );
  }

  return (
    <div
      className={`size-full flex justify-between gap-5 rounded-lg p-5 ${cardStyle} border`}
    >
      <div className="min-w-1.5">
        <h1 className="text-lg mb-3 font-bold">{title}</h1>
        {textContainer}
      </div>
      <IconContainer icon={icon} iconStyle={iconStyle} />
    </div>
  );
}

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
      iconStyle: "bg-teal-200",
    },
    {
      icon: <TrendingDown />,
      title: "Monthly Spending",
      text: "0.00 ORC",
      iconStyle: "bg-rose-200",
    },
  ];

  return (
    <div className="grid xl:grid-cols-4 xl:grid-rows-1 grid-cols-2 grid-rows-2 gap-7 mb-7">
      {cardInfoList.map((cardInfo) => (
        <WalletInfoCard
          key={cardInfo.title}
          icon={cardInfo.icon}
          title={cardInfo.title}
          text={cardInfo.text}
          cardStyle={cardInfo.cardStyle}
          iconStyle={cardInfo.iconStyle}
        />
      ))}
    </div>
  );
}
