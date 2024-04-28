interface IconContainerProps {
  icon: JSX.Element;
  iconStyle?: string;
}

interface InfoCardProps {
  icon: JSX.Element;
  title: string;
  text: string;
  extraInfo?: JSX.Element | JSX.Element[];
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

function TextContainer({ isId, text }: { isId: boolean; text: string }) {
  let className = "font-semibold break-words w-full";
  let textContainer = <p className={className}>{text}</p>;

  if (isId) {
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

  return textContainer;
}

function InfoCard({
  icon,
  title,
  text,
  extraInfo,
  cardStyle = "border",
  iconStyle = "border",
}: InfoCardProps) {
  return (
    <div
      className={`size-full flex justify-between gap-5 rounded-lg p-5 ${cardStyle}`}
    >
      <div className="min-w-1.5">
        <h1 className="text-lg mb-3 font-bold">{title}</h1>
        <TextContainer isId={title === "Wallet ID"} text={text} />
        {extraInfo}
      </div>
      <IconContainer icon={icon} iconStyle={iconStyle} />
    </div>
  );
}

export default function InfoCardContainer({
  cardInfoList,
}: {
  cardInfoList: InfoCardProps[];
}) {
  return (
    <div className="grid xl:grid-cols-4 xl:grid-rows-1 grid-cols-2 grid-rows-2 gap-7 mb-7">
      {cardInfoList.map((cardInfo) => (
        <InfoCard
          key={cardInfo.title}
          icon={cardInfo.icon}
          title={cardInfo.title}
          text={cardInfo.text}
          extraInfo={cardInfo.extraInfo}
          cardStyle={cardInfo.cardStyle}
          iconStyle={cardInfo.iconStyle}
        />
      ))}
    </div>
  );
}
