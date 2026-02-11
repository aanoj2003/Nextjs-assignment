import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaNewspaper,
  FaFolder,
  FaUser,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

export default function Sidebar({ open, setOpen, isMobile }) {
  const router = useRouter();

  // Sidebar Menu Config (scalable)
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/"
    },
    {
      name: "All Posts",
      icon: <FaNewspaper />,
      path: "/posts"
    },
    {
      name: "Categories",
      icon: <FaFolder />,
      path: "/categories"
    }
  ];

  const secondaryItems = [
    {
      name: "Settings",
      icon: <FaCog />,
      path: "#"
    },
    {
      name: "Logout",
      icon: <FaSignOutAlt />,
      path: "#"
    }
  ];

  return (
    <>
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            className="sidebarOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.aside
        className="sidebar"
        initial={{ x: -260 }}
        animate={{ x: open ? 0 : -260 }}
        transition={{ duration: 0.35 }}
      >
        {/* USER PANEL */}
        <motion.div 
          className="userBox"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="avatar">
            <FaUser />
          </div>
          <div>
            <h3>Admin User</h3>
            <p>admin@blog.com</p>
          </div>
        </motion.div>

        {/* MENU */}
        <nav className="menu">
          {menuItems.map((item, idx) => {
            const active =
              router.pathname === item.path ||
              router.pathname.startsWith(item.path + "/");

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + idx * 0.05 }}
              >
                <Link
                  href={item.path}
                  className={`menuItem ${active ? "activeLink" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <span className="icon">{item.icon}</span>
                  <span>{item.name}</span>

                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="activeIndicator"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* DIVIDER */}
        <div style={{ height: "1px", background: "#e5e7eb", margin: "20px 0" }} />

        {/* SECONDARY MENU */}
        <nav className="menu" style={{ marginBottom: "20px" }}>
          {secondaryItems.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + idx * 0.05 }}
            >
              <Link
                href={item.path}
                className="menuItem"
                style={{ opacity: 0.7 }}
              >
                <span className="icon">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* FOOTER */}
        <div style={{ padding: "16px", background: "#f9fafb", borderRadius: "10px", textAlign: "center", fontSize: "12px", color: "#999" }}>
          © 2024 Blog Hub. All rights reserved.
        </div>
      </motion.aside>
    </>
  );
}