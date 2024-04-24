import { ChevronsUp, ChevronsDown, Upload, Download } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  percent: string;
  icon?: JSX.Element;
  backgroundColor?: string;
  textColor?: string;
  traffic?: boolean;
}

function CardInfo({
  title,
  value,
  percent,
  textColor,
  traffic,
}: StatsCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <h1>{title}</h1>
      <p className="text-3xl font-bold text-nowrap">
        {value} <span className="text-sm">{traffic ? "Kb/s" : "Files"}</span>
      </p>
      <p className={`text-lg ${textColor} text-nowrap`}>{percent}</p>
    </div>
  );
}

function CardIcon({
  icon,
  backgroundColor,
}: {
  icon: JSX.Element;
  backgroundColor?: string;
}) {
  return (
    <div className={`${backgroundColor} p-3 rounded-lg size-fit float-right`}>
      {icon}
    </div>
  );
}

function StatsCard({
  title,
  value,
  percent,
  icon,
  backgroundColor,
  textColor,
  traffic,
}: StatsCardProps) {
  return (
    <div className="border rounded-lg px-5 py-7">
      {icon && <CardIcon icon={icon} backgroundColor={backgroundColor} />}
      <CardInfo
        title={title}
        value={value}
        percent={percent}
        textColor={textColor}
        traffic={traffic}
      />
    </div>
  );
}

export default function StatsCardContainer() {
  const cardInfo = [
    {
      title: "Monthly Upload",
      value: 51,
      percent: "+1.5%",
      icon: <Upload />,
      backgroundColor: "bg-teal-200",
      textColor: "text-teal-500",
    },
    {
      title: "Incoming Traffic",
      value: 100,
      percent: "+10.912%",
      icon: <ChevronsUp />,
      backgroundColor: "bg-teal-200",
      textColor: "text-teal-500",
      traffic: true,
    },
    {
      title: "Monthly Download",
      value: 10,
      percent: "-0.125%",
      icon: <Download />,
      backgroundColor: "bg-rose-200",
      textColor: "text-rose-500",
    },
    {
      title: "Outgoing Traffic",
      value: 10,
      percent: "-1.212%",
      icon: <ChevronsDown />,
      backgroundColor: "bg-rose-200",
      textColor: "text-rose-500",
      traffic: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-7 col-span-2 font-semibold">
      {cardInfo.map((card) => (
        <StatsCard key={card.title} {...card} />
      ))}
    </div>
  );
}