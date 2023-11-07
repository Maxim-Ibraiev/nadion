import React from "react";
import cn from "classnames";
import s from "./Layout.module.scss";
import Footer from "../Footer";
import Header from "../Header";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

function Layout({ children, className = "" }: IProps) {
  return (
    <div className={s.container}>
      <Header />
      <main className={cn(s.main, className)}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
