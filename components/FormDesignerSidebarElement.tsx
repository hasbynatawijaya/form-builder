import React from "react";

import FormDesignerSidebarButton from "./FormDesignerSidebarButton";
import { FormElements } from "./FormElements";
import { Separator } from "./ui/separator";

export default function FormDesignerSidebarElement() {
  return (
    <div>
      <p className="text-sm text-foreground/70">Drag and drop element</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start"></p>
        <FormDesignerSidebarButton formElement={FormElements.TextField} />
        <FormDesignerSidebarButton formElement={FormElements.TitleField} />
        <FormDesignerSidebarButton formElement={FormElements.SubTitleField} />
        <FormDesignerSidebarButton formElement={FormElements.SeparatorField} />
        <FormDesignerSidebarButton formElement={FormElements.SpacerField} />
        <FormDesignerSidebarButton formElement={FormElements.CheckboxField} />
        <FormDesignerSidebarButton formElement={FormElements.DateField} />
        <FormDesignerSidebarButton formElement={FormElements.NumberField} />
        <FormDesignerSidebarButton formElement={FormElements.ParagraphField} />
        <FormDesignerSidebarButton formElement={FormElements.TextAreaField} />
        <FormDesignerSidebarButton formElement={FormElements.SelectField} />
      </div>
    </div>
  );
}
