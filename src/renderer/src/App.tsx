import HomePage from "./home/HomePage";
import StorePage from "./store/StorePage";
import MarketPage from "./market/MarketPage";
import WalletPage from "./wallet/WalletPage";
import Sidebar from "./sidebar/Sidebar";
import SettingsPage from "./settings/SettingsPage";
import ProfilePage from "./settings/profile/ProfilePage";
import AccountPage from "./settings/account/AccountPage";
import AppearancePage from "./settings/appearance/AppearancePage";
import NotificationsPage from "./settings/notifications/NotificationPage";
import DisplayPage from "./settings/display/DisplayPage";
import TransferPage from "./settings/transfer/TransferPage";
import { ThemeProvider } from "./shadcn/components/ui/ThemeProvider";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "./shadcn/components/ui/toaster"
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/settings" element={<SettingsPage />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="account" element={<AccountPage />} />
                <Route path="appearance" element={<AppearancePage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="display" element={<DisplayPage />} />
                <Route path="transfer" element={<TransferPage />} />
              </Route>
            </Routes>
          </main>
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;

const pageMap: { label: string; path: string }[] = [
  { label: "Home", path: "/" },
  { label: "Store", path: "/store" },
  { label: "Market", path: "/market" },
  { label: "Wallet", path: "/wallet" },
  { label: "Settings", path: "/settings" },
];

import { Button } from "./shadcn/components/ui/button";

const NavLink = (props: { label: string; path: string }) => {
  return (
    <Link to={props.path}>
      <Button>{props.label}</Button>
    </Link>
  );
};
