"use client";

import React from "react";

import useFormDesigner from "@/hooks/useFormDesigner";

import FormDesignerSidebarElement from "./FormDesignerSidebarElement";
import FormDesignerSidebarProperties from "./FormDesignerSidebarProperties";

export default function FormDesignerSidebar() {
  const { selectedElement } = useFormDesigner();
  return (
    <aside
      className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 
    border-l-2 border-muted p-4 bg-background overflow-y-auto h-full"
    >
      {selectedElement ? (
        <FormDesignerSidebarProperties />
      ) : (
        <FormDesignerSidebarElement />
      )}
    </aside>
  );
}
