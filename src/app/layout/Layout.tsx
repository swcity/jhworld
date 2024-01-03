import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-10">
      <Header />
      <main className="min-h-[calc(100vh-136px)]"> {children}</main>
      <Footer />
    </div>
  );
};
