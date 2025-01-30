import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="main">
        filter_vintag
      <Sidebar />
      <div >
        <Outlet /> {/* Aqui as páginas serão renderizadas */}
      </div>
    </div>
  );
};

export default Layout;
