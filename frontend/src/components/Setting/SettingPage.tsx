import { motion } from "framer-motion";
import { routeVariants } from "../../helper/RouterAnimation";

import MainSetting from "./MainSetting";
import OrcaCoinConnection from "./OrcaCoinConnection";

export default function SettingPage() {
  return (
    <motion.div
      className="overflow-auto"
      initial="initial"
      animate="final"
      variants={routeVariants}
    >
      <div className="grid grid-cols-1 overflow-y-auto scrollbar-none h-full md:grid-cols-7 ">
        <div className="md:col-span-5">
          <MainSetting />
        </div>
        <div className="md:col-span-2">
          <OrcaCoinConnection />
        </div>
      </div>
    </motion.div>
  );
}
