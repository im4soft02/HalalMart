import React from "react";
// Component
import { NavbarA } from "../../Component/Admin/NavbarA";
import { SidebarA } from "../../Component/Admin/SidebarA";
import FooterA from "../../Component/Admin/FooterA";
// Libary

const MasterLayout = () => {
  return (
    <>
      <NavbarA />
      <SidebarA />
      <FooterA />
    </>
  );
};

export default MasterLayout;
