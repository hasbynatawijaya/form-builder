import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <div className="flex w-full flex-col flex-grow mx-auto">{children}</div>;
}
