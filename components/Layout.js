import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {

  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleDark = () => setDark(prev => !prev);
  const toggleSidebar = () => setOpen(prev => !prev);

  /* ⭐ Detect Desktop / Mobile */
  useEffect(() => {

    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (!mobile) {
        setOpen(true);     // desktop → show sidebar by default
      } else {
        setOpen(false);    // mobile → hide sidebar by default
      }
    };

    handleResize(); // run once
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      <Header
        toggleDark={toggleDark}
        toggleSidebar={toggleSidebar}
        dark={dark}
      />

      <div className="layoutWrapper">
        <Sidebar open={open} setOpen={setOpen} isMobile={isMobile} />

        <main className={`mainContent ${open ? "shiftContent" : ""}`}>
          {children}
        </main>
      </div>
    </>
  );
}