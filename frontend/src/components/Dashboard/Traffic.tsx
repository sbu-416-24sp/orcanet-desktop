import GaugeComponent from "react-gauge-component";

export default function Traffic() {
  const textIncoming = (value: number) => {
    return value + " Kib/s";
  };
  const textOutgoing = (value: number) => {
    return value + " Kib/s";
  };

  return (
    <div>
      <h3 className="py-3 text-xl">TRAFFIC OVER TIME</h3>
      <div className="flex items-center bg-white justify-around pt-4  ">
        <GaugeComponent
          arc={{
            gradient: true,
            padding: 0,
            width: 0.4,
            subArcs: [
              {
                limit: 100,
                color: "#4DB2C0",
              },
            ],
          }}
          labels={{
            valueLabel: {
              formatTextValue: textIncoming,
              style: { fontSize: "32px", fill: "#111", textShadow: "" },
            },
            tickLabels: {
              hideMinMax: true,
            },
          }}
          value={50}
          type="radial"
          pointer={{
            animationDelay: 0,
            elastic: true,
            length: 0.75,
            width: 20,
          }}
        />
        <GaugeComponent
          arc={{
            width: 0.4,
            subArcs: [
              {
                limit: 100,
                color: "#FCB62F",
              },
            ],
          }}
          labels={{
            valueLabel: {
              formatTextValue: textOutgoing,
              style: {
                fontSize: "32px",
                fill: "#111",
                textShadow: "",
              },
            },
            tickLabels: {
              hideMinMax: true,
            },
          }}
          value={80}
          type="radial"
          pointer={{
            animationDelay: 0,
            elastic: true,
            length: 0.75,
            width: 20,
          }}
        />
      </div>
      <div className="flex items-center bg-white justify-around pb-4">
        <h5>Incoming</h5>
        <h5>Outgoing</h5>
      </div>
    </div>
  );
}
