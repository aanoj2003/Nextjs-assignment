import Layout from "../../components/Layout";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaRss } from "react-icons/fa";
import PostCard from "../../components/PostCard";
import { posts as allPosts } from "../../data/posts";

export default function Posts() {
  return (
    <Layout>
      {/* PAGE HEADER */}
      <motion.div
        className="postsHeader"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>📰 All Articles</h1>
          <p style={{ fontSize: "16px", color: "#666", marginTop: "10px" }}>
            Discover all our published articles and tutorials
          </p>
        </div>
      </motion.div>

      {/* POSTS GRID */}
      <motion.div
        className="grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {allPosts.length > 0 ? (
          allPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 20px" }}>
            <FaRss style={{ fontSize: "48px", color: "#ddd", marginBottom: "20px" }} />
            <p style={{ fontSize: "18px", color: "#999" }}>No posts found. Check back soon!</p>
          </div>
        )}
      </motion.div>

      {/* BACK BUTTON */}
      <motion.div
        style={{ marginTop: "40px", textAlign: "center" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link href="/" className="backBtn">
          <FaArrowLeft /> Back to Dashboard
        </Link>
      </motion.div>
    </Layout>
  );
}