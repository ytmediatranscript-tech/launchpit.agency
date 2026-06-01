import React from "react";
import type { Metadata } from "next";
import "@/styles/bootstrap.min.css";
import "@/styles/style.css";
import "@/styles/rmp-menu.css";
import SmoothScroll from "@/lib/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "LaunchPit Hub | Internal Tools",
  description: "LaunchPit Agency internal growth and automation tools.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <div className="home wp-singular page-template-default page page-id-8 wp-custom-logo wp-embed-responsive wp-theme-agencytheme singular enable-search-modal missing-post-thumbnail has-no-pagination not-showing-comments show-avatars footer-top-visible bg-[#f8f6f6]">
          {children}
        </div>
      </SmoothScroll>
    </>
  );
}
