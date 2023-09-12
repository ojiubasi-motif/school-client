import React from "react";
import Topnav from "./Topnav";
import { Outlet } from "react-router-dom";

const index = () => {
  return (
    <div className="row gx-0 ">
      <div className="col-md-2"></div>
      <div className="col col-md-10 d-flex flex-column p-2 px-0 mx-0">
        <Topnav />
        <Outlet />
      </div>
    </div>
  );
};

export default index;