import React, { useState } from "react";
import { DragOverlay, useDndMonitor, Active } from "@dnd-kit/core";

import FormDesignerSidebarButtonDragOverlay from "./FormDesignerSidebarButtonDragOverlay";
import { ElementsType, FormElements } from "./FormElements";

import useFormDesigner from "@/hooks/useFormDesigner";

export default function DragOverlayWrapper() {
  const { elements } = useFormDesigner();

  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  let node = <div>no drag overlay</div>;
  const isSidebarButtonElement =
    draggedItem?.data?.current?.isDesignerButtonElement;
  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;

  if (isSidebarButtonElement) {
    const type = draggedItem?.data?.current?.type as ElementsType;
    node = (
      <FormDesignerSidebarButtonDragOverlay formElement={FormElements[type]} />
    );
  }

  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((element) => element.id === elementId);

    if (element) {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;
      node = (
        <div
          className="flex bg-accent border rounded-md h-[120px] w-full
        py-2 px-4 opacity-60 pointer pointer-events-none"
        >
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    } else node = <div>Element not found</div>;
  }

  if (!draggedItem) return null;

  return <DragOverlay>{node}</DragOverlay>;
}
