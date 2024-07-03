import React, { useState } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { BiSolidTrash } from "react-icons/bi";

import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";

import useFormDesigner from "@/hooks/useFormDesigner";

import { cn } from "@/lib/utils";

interface Props {
  element: FormElementInstance;
}

export default function FormDesignerElementWrapper({ element }: Props) {
  const { removeElement, setSelectedElement,selectedElement } = useFormDesigner();

  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const FormDesignerElement = FormElements[element.type].designerComponent;

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground 
    hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setIsMouseOver(true);
      }}
      onMouseLeave={() => {
        setIsMouseOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className={"absolute  w-full h-1/2 rounded-t-md"}
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
      ></div>
      {isMouseOver ? (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md 
            rounded-l-none bg-red-500"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div
            className="absolute top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 animate-pulse"
          >
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      ) : (
        <></>
      )}
      {topHalf.isOver ? (
        <div className="absolute w-full top-0 rounded-md h-[7px] bg-primary rounded-b-none" />
      ) : (
        <></>
      )}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none",
          isMouseOver && "opacity-30"
        )}
      >
        <FormDesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver ? (
        <div className="absolute w-full bottom-0 rounded-md h-[7px] bg-primary rounded-t-none" />
      ) : (
        <></>
      )}
    </div>
  );
}
