import React from "react";
import { Separator } from "../shadcn/components/ui/separator";
import { ScrollArea } from "../shadcn/components/ui/scroll-area";
import { SidebarNav } from "./components/SidebarNav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

const sidebarNavItems = [
  {
    title: "Transfer",
    href: "/settings/transfer",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsPage() {
  return (
    <ScrollArea className="grow h-full">
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            OrcaNet Settings
          </h2>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <Outlet />
        </div>
      </div>
    </ScrollArea>
  );
}
