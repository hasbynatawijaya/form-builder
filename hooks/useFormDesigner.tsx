"use client";

import { useContext } from "react";

import { FormDesignerContext } from "@/context/FormDesignerContext";

export default function useFormDesigner() {
  const context = useContext(FormDesignerContext);

  if (!context) throw new Error("hooks must be used within FormDesignerContext");

  return context;
}
