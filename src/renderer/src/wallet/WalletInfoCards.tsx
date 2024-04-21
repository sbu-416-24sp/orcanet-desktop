import { CircleDollarSign, Info, TrendingDown, TrendingUp } from "lucide-react";
export default function WalletInfoCards() {
  async function copyIDToClipboard(e: React.MouseEvent<HTMLParagraphElement>) {
    await navigator.clipboard.writeText(e.currentTarget.innerText);
  }

  return (
    <div className="grid grid-cols-4 gap-7 mb-7">
      <div className="flex justify-between bg-stone-900 text-white rounded-lg p-5 border">
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
      <div className="flex justify-between bg-white rounded-lg p-5 border">
        <div className="w-9/12">
          <h1 className="text-lg mb-3 font-bold">Wallet ID</h1>
          <p
            onClick={(e) => copyIDToClipboard(e)}
            className="w-full break-words font-semibold underline hover:cursor-pointer hover:text-indigo-500"
          >
            13hgriwdGXvPyWFABDX6QByyxvN8cWCgDp
          </p>
        </div>
        <div className="flex items-center h-full">
          <div className="p-3 bg-indigo-300 rounded-lg size-fit text-stone-900 border">
            <Info />
          </div>
        </div>
      </div>
      <div className="flex justify-between bg-white rounded-lg p-5 border">
        <div className="w-9/12">
          <h1 className="text-lg mb-3 font-bold">Monthly Earning</h1>
          <p className="w-full break-words font-semibold">100.00 ORC</p>
        </div>
        <div className="flex items-center h-full">
          <div className="p-3 bg-teal-200 rounded-lg size-fit text-stone-900 mr-3 border">
            <TrendingUp />
          </div>
        </div>
      </div>
      <div className="flex justify-between bg-white rounded-lg p-5 border">
        <div className="w-9/12">
          <h1 className="text-lg mb-3 font-bold">Monthly Spent</h1>
          <p className="w-full break-words font-semibold">0 ORC</p>
        </div>
        <div className="flex items-center h-full">
          <div className="p-3 bg-rose-200 rounded-lg size-fit text-stone-900">
            <TrendingDown />
          </div>
        </div>
      </div>
    </div>
  );
}
