import { useEffect, useState } from "react";
import { Clock } from "react-bootstrap-icons";

const TimeBar = () => {
  const [time, setTime] = useState(new Date());

  const update = () => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  };

  useEffect(update, []);

  const formattedTime: string = time.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const date: string = time.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const [m, d, y]: string[] = date.split(" ");
  const day: string = d.replace(",", "");

  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-2xl px-3 py-1 text-sm">
      <div className="flex items-center">
        <Clock />
        <span className="ml-2">{formattedTime}</span>
      </div>
      <span className="mx-2 h-6 border-l border-gray-300"></span>
      <div>
        <span>
          {day} {m} {y}
        </span>
      </div>
    </div>
  );
};

export default TimeBar;
