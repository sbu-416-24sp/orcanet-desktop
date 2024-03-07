import { DataTable } from "./MarketTable";
import { columns } from "./MarketTableType";
import { motion } from "framer-motion";
import { routeVariants } from "../../helper/RouterAnimation";

import data from "./MarketData";

const MarketPage = () => {
  return (
    <motion.div
      className="p-8 h-full w-full bg-blue-100 bg-opacity-50 overflow-auto"
      initial="initial"
      animate="final"
      variants={routeVariants}
    >
      <DataTable columns={columns} data={data} />
    </motion.div>
  );
};

export default MarketPage;
