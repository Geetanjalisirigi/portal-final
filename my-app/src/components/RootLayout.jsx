// RootLayout.jsx
import React from "react";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavigationBar />
      <div style={{ flex: 1, margin: 0, padding: 0 }}>
        <Outlet />
      </div>
      <Footer style={{ marginTop: "0", paddingTop: "0" }} />
    </div>
  );
}

export default RootLayout;