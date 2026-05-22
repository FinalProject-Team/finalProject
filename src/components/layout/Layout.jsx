import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (

    <div
      style={{
        display: "flex",
        background: "#020817",
        minHeight: "100vh",
        color: "white"
      }}
    >

      <Sidebar />

      <div style={{ flex: 1 }}>

        <Topbar />

       <div style={{ flex: 1, overflowY: "auto" }}>        
            <Outlet />
        </div>

      </div>

    </div>
  )
}