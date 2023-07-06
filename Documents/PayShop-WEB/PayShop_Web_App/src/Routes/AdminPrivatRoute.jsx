import { Dashboard } from "@mui/icons-material";
import React from "react";
import { Route } from "react-router";
import { NavLink } from "react-router-dom";

const AdminPrivatRoute = () => {
  return (
    <></>
    // <Route
    //   {...rest}
    //   render={({ props, location }) =>
    //     localStorage.getItem("auth_token") ? <Dashboard /> : <NavLink to="/" />
    //   }
    // />
  );
};

export default AdminPrivatRoute;
