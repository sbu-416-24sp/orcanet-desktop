import { AlignRight } from "lucide-react";
import WalletInfoCards from "./WalletInfoCards";
import WalletMiddleContainer from "./WalletMiddleContainer";
import TransactionTable from "./TransactionTable";
import { Search } from "lucide-react";
import { useParams } from "react-router-dom";

function WalletContainer() {
  const { page } = useParams();

  return (
    <div className="size-full px-10 py-7 overflow-y-auto">
      {!page ? <WalletInfoCards /> : null}
      {!page ? <WalletMiddleContainer /> : null}
      <TransactionTable />
    </div>
  );
}

function WallerPageHeader() {
  return (
    <div className="bg-white w-full py-5 px-7 flex justify-between items-center drop-shadow-md">
      <div className="flex items-center gap-2">
        <AlignRight />
        <h1 className="font-bold text-xl">Wallet</h1>
      </div>
      <div className="flex items-center relative">
        <input
          type="text"
          className="block m-0 border border-stone-900 rounded-xl pl-3 pr-10 py-1"
          placeholder="Search"
        />
        <Search className="absolute right-2" />
      </div>
    </div>
  );
}

const WalletPage = () => {
  return (
    <div id="wallet-page" className="flex flex-col grow size-full text-black">
      <WallerPageHeader />
      <WalletContainer />
    </div>
  );
};

export default WalletPage;
