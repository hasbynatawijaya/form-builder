"use client";

import React, { useEffect, useState } from "react";

import { Button } from "./ui/button";

import useMounted from "@/hooks/useMounted";

interface Props {
  shareUrl: string;
}

export default function VisitButton({ shareUrl }: Props) {
  const { isMounted } = useMounted();

  if (!isMounted) return null;

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <Button
      className="w-[200px]"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >
      Visit
    </Button>
  );
}
