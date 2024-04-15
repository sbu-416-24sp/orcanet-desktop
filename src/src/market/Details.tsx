import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Pause, Play, Trash2 } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import fakeSeeds from "./fakeSeeds";
import { GeneralInfoPanel } from "./GeneralInfoPanel";
import { JobInfo } from "./MarketPage";

const Details = (props: { jobInfo: JobInfo }) => {
  return (
    <div className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)] gap-4">
      <GeneralInfoPanel jobInfo={props.jobInfo} />
      <PeerPanel />
    </div>
  );
};

export default Details;

const PeerPanel = () => {
  return (
    <div>
      <Tabs defaultValue="selected_peers">
        <TabsList>
          <TabsTrigger value="selected_peers">Selected Peers</TabsTrigger>
          <TabsTrigger value="more_peers">More Peers</TabsTrigger>
        </TabsList>
        <TabsContent value="selected_peers">
          <SelectedPeers />
        </TabsContent>
        <TabsContent value="more_peers">
          <MorePeers />
        </TabsContent>
      </Tabs>
    </div>
  );
};
const SelectedPeers = () => {
  const selectedPeersInfoList = [
    {
      id: "1",
      ipAddress: "127.0.0.1",
      region: "North America",
      price: "0.1 USD/MiB",
      amountDownloaded: "2 MiB",
      status: "active",
      speed: "10 KiB/s",
      speedGraph: [
        { time: 0, speed: 0 },
        { time: 1, speed: 4 },
        { time: 2, speed: 6 },
        { time: 3, speed: 7 },
        { time: 4, speed: 7 },
        { time: 5, speed: 7 },
      ],
    },
    {
      id: "2",
      ipAddress: "127.0.0.1",
      region: "North America",
      price: "0.1 USD/MiB",
      amountDownloaded: "2 MiB",
      status: "active",
      speed: "10 KiB/s",
      speedGraph: [
        { time: 0, speed: 0 },
        { time: 1, speed: 4 },
        { time: 2, speed: 6 },
        { time: 3, speed: 7 },
        { time: 4, speed: 7 },
        { time: 5, speed: 7 },
      ],
    },
  ];
  return (
    <>
      <div className="flex justify-between">
        <div>Status</div>
        <div>IP Address</div>
        <div>Price</div>
        <div>Total Storage</div>
        <div className="flex invisible">
          <Play /> <Pause />
          <Trash2 />
        </div>
      </div>
      <ul>
        {selectedPeersInfoList.map((e) => (
          <SelectedPeer key={e.id} {...e} />
        ))}
      </ul>
    </>
  );
};
const SelectedPeer = (props: {
  id: string;
  ipAddress: string;
  region: string;
  price: string;
  amountDownloaded: string;
  status: string;
  speed: string;
  speedGraph: { time: number; speed: number }[];
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="bg-card">
          <div className="w-full flex justify-between">
            <div>{props.status}</div>
            <div>{props.ipAddress}</div>
            <div>{props.price}</div>
            <div>{props.amountDownloaded}</div>
            <div className="flex">
              <Play className="hover:text-accent" />
              <Pause className="hover:text-accent" />
              <Trash2 className="hover:text-destructive" />
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <LineChart width={300} height={100} data={props.speedGraph}>
            <Line type="monotone" dataKey="speed" stroke="var(--primary)" />
            <CartesianGrid stroke="#ccc" />
            <XAxis />
            <YAxis />
          </LineChart>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
const MorePeers = () => {
  return <DataTable columns={columns} data={fakeSeeds} />;
};
