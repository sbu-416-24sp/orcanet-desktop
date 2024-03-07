import { motion } from "framer-motion";
import { routeVariants } from "../../helper/RouterAnimation";
import { useState, useEffect } from "react";
import { columns } from "./columns";
import IPayment from "@/interfaces/IPayment";
import { Button } from "@/components/ui/button";
import { DataTable } from "./DataTable";
import QRCode from "react-qr-code";
import OrcaCoin from "../../svgs/orcaCoin.svg";
import { WalletData } from "./WalletData";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Header from "../Header/Header";

async function getData(): Promise<IPayment[]> {
  // Fetch data from your API here.
  return WalletData;
}

export default function DemoPage() {
  const [data, setData] = useState<IPayment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <motion.div
      className="p-8 h-full w-full bg-blue-100 bg-opacity-50 overflow-auto"
      initial="initial"
      animate="final"
      variants={routeVariants}
    >
      <div>
        <Header />
        <Card className="animate__animated animate__fadeInUp">
          <CardHeader>
            <CardDescription className="text-base font-medium">
              Balance
            </CardDescription>
            <CardTitle className="flex justify-items-center">
              <img src={OrcaCoin} alt="Orca Coin" className="mr-2 h-10" />
              <div className="text-4xl font-bold">1024.576</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid justify-items-center">
              <QRCode value={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} />
              <p className="mt-4">
                12D3KooWM1J3AZKnEvVtEVjwFka2Z2Z9EZo5XVzUoyrAofWRUUWK
              </p>
              <div>
                <Button className="">Send</Button>
                <Button className="ml-4">Request</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mx-auto mt-3 animate__animated animate__fadeInUp">
          <h3 className="mb-3 animate__animated animate__fadeInUp">
            Transactions
          </h3>
          {data.length > 0 ? (
            <DataTable columns={columns} data={data} />
          ) : (
            <div>Loading Transactions...</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
