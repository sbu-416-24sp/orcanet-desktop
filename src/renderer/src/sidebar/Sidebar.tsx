import {
  ChevronLast,
  ChevronFirst,
  BarChart2,
  LineChart,
  WalletCards,
  LayoutDashboard,
  Settings,
  Package,
  Pickaxe,
} from "lucide-react";
import { createContext, useState } from "react";
export const SidebarContext = createContext({ expanded: true });
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";

function SidebarHeader({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="p-4 pb-2 flex justify-between items-center my-4">
      <div
        className={`font-bold text-3xl overflow-hidden transition-all ${
          expanded ? "w-32" : "w-0"
        }`}
      >
        OrcaNet
      </div>
      <button
        onClick={() => setExpanded((curr) => !curr)}
        className="p-1.5 rounded-lg  hover:bg-gray-300 bg-gray-200 dark:bg-gray-600 text-foreground"
      >
        {expanded ? <ChevronFirst /> : <ChevronLast />}
      </button>
    </div>
  );
}

function NavButtons({
  expanded,
  isActive,
  isSettingsActive,
}: {
  expanded: boolean;
  isActive: (path: string) => boolean;
  isSettingsActive: () => boolean;
}) {
  const navButtons = [
    {
      path: "/",
      icon: <LayoutDashboard />,
      text: "Home",
      active: isActive("/"),
      alert: false,
    },
    {
      path: "/stats",
      icon: <LineChart />,
      text: "Stats",
      active: isActive("/stats"),
      alert: false,
    },
    {
      path: "/peers",
      icon: <Package />,
      text: "Peer",
      active: isActive("/peers"),
      alert: false,
    },
    {
      path: "/market",
      icon: <BarChart2 />,
      text: "Market",
      active: isActive("/market"),
      alert: false,
    },
    {
      path: "/wallet",
      icon: <WalletCards />,
      text: "Wallet",
      active: isActive("/wallet"),
      alert: false,
    },
    {
      path: "/mining",
      icon: <Pickaxe />,
      text: "Mining",
      active: isActive("/mining"),
      alert: false,
    },
    {
      path: "/settings/profile",
      icon: <Settings />,
      text: "Settings",
      active: isSettingsActive(),
      alert: false,
    },
  ];

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <div className="px-3">
        {navButtons.map(({ path, icon, text, active, alert }) => (
          <SidebarItem
            key={text}
            path={path}
            icon={icon}
            text={text}
            active={active}
            alert={alert}
          />
        ))}
      </div>
    </SidebarContext.Provider>
  );
}

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const isSettingsActive = () => {
    const paths = [
      "/settings",
      "/settings/appearance",
      "/settings/notifications",
      "/settings/transfer",
    ];
    return paths.some((path) => isActive(path));
  };

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-card border-r shadow-sm text-lg">
        <SidebarHeader expanded={expanded} setExpanded={setExpanded} />
        <NavButtons
          expanded={expanded}
          isActive={isActive}
          isSettingsActive={isSettingsActive}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
