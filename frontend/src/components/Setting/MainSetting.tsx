import Header from "../Header/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function AccessKeyGenerator() {
  return (
    <div>
      <h3 className="pb-4 animate__animated animate__fadeInUp">Access Key</h3>
      <div className=" bg-white p-4 rounded-2xl animate__animated animate__fadeInUp">
        <p className="text-cyan-800 font-bold break-all m-0 pb-4">
          The OrcaNet Name System (ONNS) provides cryptographic addresses for
          publishing updates to content that is expected to change over time.
          This feature requires your node to be online at least once a day to
          ensure ONNS records are kept alive on the public DHT.
        </p>
        <div className="flex items-center justify-between">
          <Input
            type="text"
            className="access-key"
            defaultValue="CAESIKY9RkdcwVuPzyQPn2SX7CEJRIj87Y1Mxtm0S5ABQMvI"
            placeholder="Enter Access Key"
          />
          <Button className="ml-4 rounded-lg bg-sky-500 hover:bg-sky-700">
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function MainSetting() {
  return (
    <div className="p-8 bg-blue-100 bg-opacity-50 h-full">
      <Header />
      <AccessKeyGenerator />
    </div>
  );
}
