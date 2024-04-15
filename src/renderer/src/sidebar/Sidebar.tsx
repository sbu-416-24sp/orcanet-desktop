import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  BarChart2,
} from "lucide-react";
import { useContext, createContext, useState, ReactNode } from "react";
import { LayoutDashboard, Settings, Receipt, Network } from "lucide-react";
export const SidebarContext = createContext({ expanded: true });
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import orcanetLogo from "./../assets/images/OrcaNet-Dark.png";
import React from "react";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const isSettingsActive = () => {
    const paths = [
      "/settings",
      "/settings/profile",
      "/settings/account",
      "/settings/appearance",
      "/settings/notifications",
      "/settings/display",
      "/settings/transfer",
    ];
    return paths.some((path) => isActive(path));
  };

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-card border-r shadow-sm text-lg">
        <div className="p-4 pb-2 flex justify-between items-center mt-4">
          {/* <img
            src={orcanetLogo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="OrcaNet"
          /> */}
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

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 text-nowrap">
            <Link to="/">
              <SidebarItem
                icon={<LayoutDashboard />}
                text="Home"
                active={isActive("/")}
                alert={false}
              />
            </Link>
            <Link to="/peers">
              <SidebarItem
                icon={<Network />}
                text="Peers"
                active={isActive("/peers")}
                alert={false}
              />
            </Link>
            <Link to="/market">
              <SidebarItem
                icon={<BarChart2 />}
                text="Market"
                active={isActive("/market")}
                alert={false}
              />
            </Link>
            <Link to="/wallet">
              <SidebarItem
                icon={<Receipt />}
                text="Wallet"
                active={isActive("/wallet")}
                alert={false}
              />
            </Link>
            <Link to="/settings/profile">
              <SidebarItem
                icon={<Settings />}
                text="Settings"
                active={isSettingsActive()}
                alert={false}
              />
            </Link>
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=CBC3E3&name=Bubble+Guppies"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-32 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Bubble Guppies</h4>
              <span className="text-xs text-gray-600"></span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
