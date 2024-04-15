import React, { ReactNode } from "react";
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";

type SidebarItemProps = {
  icon: JSX.Element;
  text: string;
  active: boolean;
  alert: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active,
  alert,
}) => {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            active
              ? "bg-gradient-to-tr from-secondary to-secondary text-secondary-foreground"
              : "hover:bg-accent hover:text-accent-foreground text-muted-foreground"
          }
      `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-30 ml-3" : "w-0" // <- This is where I change the width of the bar
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full z-10 rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
