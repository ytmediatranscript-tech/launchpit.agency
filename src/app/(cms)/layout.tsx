import React from "react";
import "@/styles/bootstrap.min.css";
import "@/styles/style.css";
import "@/styles/rmp-menu.css";
import SmoothScroll from "@/lib/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export default function CMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <div className="home wp-singular page-template-default page page-id-8 wp-custom-logo wp-embed-responsive wp-theme-agencytheme singular enable-search-modal missing-post-thumbnail has-no-pagination not-showing-comments show-avatars footer-top-visible">
          {children}
        </div>
      </SmoothScroll>
    </>
  );
}
