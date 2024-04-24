import { CircleDollarSign, Zap, HandCoins, Cpu } from "lucide-react";
import MiningDevices from "./MiningDevices";
import { useState } from "react";

const MiningPage = () => {
  async function copyIDToClipboard(e: React.MouseEvent<HTMLParagraphElement>) {
    await navigator.clipboard.writeText(e.currentTarget.innerText);
  }

  function MiningPageHeader() {
    return (
      <div className="bg-white w-full py-5 px-7 flex justify-between items-center drop-shadow-md">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-xl">Mining</h1>
        </div>
      </div>
    );
  }

  function MiningDashBoard() {
    return (
      <div className="grid grid-cols-4 gap-7 mb-7">
        <div className="flex justify-between bg-stone-950 text-white rounded-lg p-5">
          <div>
            <h1 className="text-lg mb-3 font-bold">Balance</h1>
            <p className="font-semibold">100.00 ORC</p>
          </div>
          <div className="flex items-center h-full">
            <div className="p-3 bg-stone-800 rounded-lg size-fit">
              <CircleDollarSign />
            </div>
          </div>
        </div>
        <div className="flex justify-between border rounded-lg p-5">
          <div className="w-9/12">
            <h1 className="text-lg mb-3 font-bold">Total Hash Power</h1>
            <p className="w-full break-words font-semibold">175.24 MH/s</p>
          </div>
          <div className="flex items-center h-full">
            <div className="p-3 bg-yellow-300 rounded-lg size-fit text-stone-900">
              <Zap />
            </div>
          </div>
        </div>
        <div className="flex justify-between border rounded-lg p-5">
          <div className="w-9/12">
            <h1 className="text-lg mb-3 font-bold">Unpaid Balance</h1>
            <p className="w-full break-words font-semibold">3.65 ORC</p>
            <p className="w-full break-words font-mono text-gray-500">
              Next Payout: 3h28m
            </p>
          </div>
          <div className="flex items-center h-full">
            <div className="p-3 bg-slate-300 rounded-lg size-fit text-stone-900 mr-3">
              <HandCoins />
            </div>
          </div>
        </div>
        <div className="flex justify-between border rounded-lg p-5">
          <div className="w-9/12">
            <h1 className="text-lg mb-3 font-bold">Devices Mining</h1>
            <p className="w-full break-words font-semibold">4/5</p>
          </div>
          <div className="flex items-center h-full">
            <div className="p-3 bg-green-300 rounded-lg size-fit text-stone-900">
              <Cpu />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="mining-page" className="flex flex-col grow size-full text-black">
      <MiningPageHeader />
      <div className="size-full px-10 py-7 overflow-y-auto">
        <MiningDashBoard />
        <MiningDevices />
      </div>
    </div>
  );
};

export default MiningPage;