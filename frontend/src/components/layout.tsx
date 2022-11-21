import Link from "next/link";
import React, { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
