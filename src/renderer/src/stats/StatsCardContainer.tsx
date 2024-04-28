import { ChevronsUp, ChevronsDown, Upload, Download } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon?: JSX.Element;
  backgroundColor?: string;
  traffic?: boolean;
}

function CardInfo({ title, value, traffic }: StatsCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-nowrap">{title}</h1>
      <p className="xl:text-4xl text-3xl font-bold text-nowrap mt-3 xl:text-center text-start">
        {value} <span className="text-sm">{traffic ? "Kb/s" : "Files"}</span>
      </p>
    </div>
  );
}

function CardIcon({ icon, backgroundColor }: { icon: JSX.Element; backgroundColor?: string }) {
  return (
    <div className={`${backgroundColor} p-3 rounded-lg size-fit float-right`}>
      {icon}
    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
  backgroundColor,
  traffic,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg px-5 py-7">
      {icon && <CardIcon icon={icon} backgroundColor={backgroundColor} />}
      <CardInfo
        title={title}
        value={value}
        traffic={traffic}
      />
    </div>
  );
}

export default function StatsCardContainer() {
  const cardInfo = [
    {
      title: "Total Upload",
      value: 51,
      icon: <Upload />,
      backgroundColor: "bg-teal-200",
      textColor: "text-teal-500",
    },
    {
      title: "Incoming Traffic",
      value: 100,
      icon: <ChevronsUp />,
      backgroundColor: "bg-teal-200",
      textColor: "text-teal-500",
      traffic: true,
    },
    {
      title: "Total Download",
      value: 10,
      icon: <Download />,
      backgroundColor: "bg-rose-200",
      textColor: "text-rose-500",
    },
    {
      title: "Outgoing Traffic",
      value: 10,
      icon: <ChevronsDown />,
      backgroundColor: "bg-rose-200",
      textColor: "text-rose-500",
      traffic: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-7 xl:col-span-2 font-semibold">
      {cardInfo.map((card) => (
        <StatsCard key={card.title} {...card} />
      ))}
    </div>
  );
}
