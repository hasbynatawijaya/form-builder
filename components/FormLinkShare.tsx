"use client";

import React from "react";
import { ImShare } from "react-icons/im";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

import useMounted from "@/hooks/useMounted";

interface Props {
  shareUrl: string;
}

export default function FormLinkShare({ shareUrl }: Props) {
  const { isMounted } = useMounted();

  if (!isMounted) return null;

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />
      <Button
        className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "copied",
            description: "Link copied to clipboard",
          });
        }}
      >
        <ImShare className="mr-2 h-4 w-4" />
        Share link
      </Button>
    </div>
  );
}
