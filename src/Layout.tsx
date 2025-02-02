import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <div className="main">
      <Sidebar />
      <div className="p-4 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
