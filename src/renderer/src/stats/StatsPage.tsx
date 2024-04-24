import StatsCardContainer from "./StatsCardContainer";
import BandwidthChart from "./BandwidthChart";
import FileTypeChart from "./FileTypeChart";
import ActivityChart from "./ActivityChart";

function StatsPageContent() {
  return (
    <div className="size-full overflow-y-auto p-7">
      <div className="grid grid-cols-5 gap-7">
        <StatsCardContainer />
        <BandwidthChart />
      </div>
      <div className="grid grid-cols-2 gap-7 mt-7">
        <FileTypeChart />
        <ActivityChart />
      </div>
    </div>
  );
}

const StatsPage = () => {
  return (
    <div id="stats-page" className="size-full flex flex-col">
      <StatsPageContent />
    </div>
  );
};

export default StatsPage;