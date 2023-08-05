import { Box, LinearProgress } from "@mui/material";
import { getAuth } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../firebase.init";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { useEffect } from "react";


const auth = getAuth(app);
const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  console.log("🚀 ~ file: RequireAuth.js:13 ~ RequireAuth ~ user:", user)
  const { currentUser, loader,currentAdmin } = useContext(AuthContext)
  console.log("🚀 ~ file: RequireAuth.js:14 ~ RequireAuth ~ currentUser:", currentUser?.uid)

  let location = useLocation();

  if (loading) {
    return <LinearProgress color="success" />
  }
  if (!user && !currentAdmin) {
    return (
      <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    );
  }

  return children;
};

export default RequireAuth;
