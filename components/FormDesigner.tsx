"use client";

import React from "react";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";

import FormDesignerSidebar from "./FormDesignerSidebar";
import { ElementsType, FormElements } from "./FormElements";
import FormDesignerElementWrapper from "./FormDesignerElementWrapper";

import useFormDesigner from "@/hooks/useFormDesigner";

import { cn } from "@/lib/utils";
import { idGenerator } from "@/lib/idGenerator";

export default function FormDesigner() {
  const {
    addElement,
    elements,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useFormDesigner();

  const droppable = useDroppable({
    id: "form-designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerButtonElement =
        active?.data?.current?.isDesignerButtonElement;
      const isDroppingOverDesignerDropArea =
        over?.data?.current?.isDesignerDropArea;
      const isDroppingOverTopHalfDesignerElement =
        over?.data?.current?.isTopHalfDesignerElement;
      const isDroppingOverBottomHalfDesignerElement =
        over?.data?.current?.isBottomHalfDesignerElement;

      if (isDesignerButtonElement && isDroppingOverDesignerDropArea) {
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(elements.length, newElement);
        return;
      }

      if (
        isDesignerButtonElement &&
        (isDroppingOverTopHalfDesignerElement ||
          isDroppingOverBottomHalfDesignerElement)
      ) {
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        const overElementId = over?.data?.current?.elementId;
        const overElementIndex = elements.findIndex(
          (el) => el.id === overElementId
        );

        let indexForNewElement = overElementIndex;

        if (isDroppingOverBottomHalfDesignerElement) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      if (
        (isDroppingOverBottomHalfDesignerElement ||
          isDroppingOverTopHalfDesignerElement) &&
        isDraggingDesignerElement
      ) {
        const activeId = active?.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);

        const activeElement = { ...elements[activeElementIndex] };

        removeElement(activeId);

        let indexForNewElement = overElementIndex;

        if (isDroppingOverBottomHalfDesignerElement) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
        return;
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            `bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col 
            flex-grow items-center justify-start flex-1 overflow-y-auto`,
            droppable.isOver && "ring-2 ring-primary ring-inset"
          )}
        >
          {!droppable.isOver && elements.length === 0 ? (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          ) : (
            <></>
          )}
          {droppable.isOver && elements.length === 0 ? (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          ) : (
            <></>
          )}
          {elements.length > 0 ? (
            <div className="flex flex-col text-background w-full gap-2 p-4">
              {elements.map((element) => (
                <FormDesignerElementWrapper
                  key={element.id}
                  element={element}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <FormDesignerSidebar />
    </div>
  );
}
