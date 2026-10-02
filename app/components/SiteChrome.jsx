"use client";

import { usePathname } from "next/navigation";
import Header from "../header";
import Footer from "../footer";
import Preloader from "./Preloader";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return children;
  return <><Preloader /><div id="site-content" className="relative z-10"><Header /><main>{children}</main><Footer /></div></>;
}
