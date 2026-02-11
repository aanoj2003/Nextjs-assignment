import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { FaFolder, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { posts as allPosts } from "../data/posts";

export default function Categories() {
  // Get unique categories with post counts
  const categories = [...new Set(allPosts.map(p => p.category))].map(cat => ({
    name: cat,
    count: allPosts.filter(p => p.category === cat).length
  }));

  return (
    <Layout>
      {/* PAGE HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="pageTitle">📁 Browse Categories</h1>
        <p style={{ fontSize: "16px", color: "#666", marginBottom: "30px" }}>
          Explore articles organized by topic
        </p>
      </motion.div>

      {/* CATEGORIES GRID */}
      <div className="categoriesList">
        {categories.map((category, idx) => (
          <motion.div
            key={category.name}
            className="categoryCard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <FaFolder style={{ fontSize: "24px", color: "#6366f1" }} />
              <h3>{category.name}</h3>
            </div>

            <p>{category.count} article{category.count !== 1 ? "s" : ""}</p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="categoryCount">{category.count} Posts</span>
              <Link href={`/?category=${category.name}`} style={{ color: "#6366f1", fontWeight: "600" }}>
                <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {categories.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ fontSize: "18px", color: "#999" }}>No categories found</p>
        </div>
      )}
    </Layout>
  );
}