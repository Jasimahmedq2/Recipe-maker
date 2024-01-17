"use client";
import React from "react";

import { NextUIProvider } from "@nextui-org/react";

const SharedNextUi = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default SharedNextUi;
