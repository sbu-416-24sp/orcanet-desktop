import WalletInfoCards from "./WalletInfoCards";
import WalletTransPanel from "./WalletTransPanel";
import WalletTransGraph from "./WalletTransGraph";
import TransactionTable from "./TransactionTable";

function WalletPageContent({ path }: { path: string }) {
  return (
    <div
      className={`size-full ${
        path === "wallet" ? "p-10" : "bg-white"
      } overflow-y-auto`}
    >
      {path === "wallet" && <WalletInfoCards />}
      {path === "wallet" && (
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-7 mb-7">
          <WalletTransPanel />
          <WalletTransGraph />
        </div>
      )}
      <TransactionTable path={path} />
    </div>
  );
}

const WalletPage = ({ path }: { path: string }) => {
  return (
    <div id="wallet-page" className="size-full flex flex-col text-black">
      <WalletPageContent path={path} />
    </div>
  );
};

export default WalletPage;
