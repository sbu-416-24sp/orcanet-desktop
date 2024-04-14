import { useState } from "react";
import { JobInfo, JobStatus } from "./MarketPage";
import OverviewHeader from "./OverviewHeader";
import { JobList, JobControls, JobListHeader } from "./Job";

const Overview = (props: {
  jobInfoList: JobInfo[];
  updateJobStatuses: (newStatus: JobStatus) => void;
  removeJobs: () => void;
  addJob: (hash: string) => void;
}) => {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState([
    ["timeQueued", "descending"],
    ["name", "descending"],
    ["size", "descending"],
    ["eta", "descending"],
  ]);
  return (
    <div className="">
      <OverviewHeader
        setFilter={setFilter}
        setStatusFilter={setStatusFilter}
        addJob={props.addJob}
      />
      <JobListHeader
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      ></JobListHeader>
      <JobList
        jobInfoList={props.jobInfoList}
        filter={filter}
        statusFilter={statusFilter}
        sortOrder={sortOrder}
      />
      <JobControls
        updateJobStatuses={props.updateJobStatuses}
        removeJobs={props.removeJobs}
      />
    </div>
  );
};
export default Overview;
