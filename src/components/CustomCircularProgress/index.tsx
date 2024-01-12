"use client";
import { CircularProgress } from "@mui/material";
import React from "react";

const CustomCircularProgress = ({ color }: any) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 4000,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(75, 75, 75, 0.266)",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <CircularProgress color={color} />
    </div>
  );
};

export default CustomCircularProgress;
