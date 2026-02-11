import Layout from "../../components/Layout";
import Link from "next/link";
import { FaArrowLeft, FaCalendar, FaClock, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import PostCard from "../../components/PostCard";
import { posts } from "../../data/posts";

export default function Post({ post, relatedPosts }) {

  if (!post) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2 style={{ fontSize: "28px", color: "#222", marginBottom: "20px" }}>Post Not Found</h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>Sorry, this article could not be found.</p>
          <Link href="/" className="backBtn">
            <FaArrowLeft /> Back Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        className="postContainer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >

        {/* BACK BUTTON */}
        <Link href="/" className="backBtn">
          <FaArrowLeft /> Back to Dashboard
        </Link>

        {/* HERO IMAGE */}
        <motion.div
          className="postHero"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <img 
            src={post.image} 
            alt={post.title}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "8px"
            }}
          />
        </motion.div>

        {/* CATEGORY */}
        <motion.span
          className="postCategory"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {post.category}
        </motion.span>

        {/* TITLE */}
        <motion.h1
          className="postTitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          {post.title}
        </motion.h1>

        {/* META INFO */}
        <motion.div
          style={{
            display: "flex",
            gap: "30px",
            margin: "20px 0 30px",
            paddingBottom: "30px",
            borderBottom: "1px solid #e5e7eb",
            flexWrap: "wrap"
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#666" }}>
            <FaUser style={{ color: "#6366f1" }} />
            <span>{post.author || "Admin"}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#666" }}>
            <FaCalendar style={{ color: "#6366f1" }} />
            <span>{new Date().toLocaleDateString()}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#666" }}>
            <FaClock style={{ color: "#6366f1" }} />
            <span>{post.readTime || "5 min read"}</span>
          </div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          className="postContent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <p>{post.content}</p>

          {/* EXPANDED CONTENT */}
          <div style={{ marginTop: "30px", lineHeight: "2" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#222", marginBottom: "15px" }}>
              About This Article
            </h3>
            <p style={{ marginBottom: "15px" }}>
              {post.content} This article provides comprehensive insights into modern web development practices and cutting-edge technologies.
            </p>

            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#222", marginBottom: "15px", marginTop: "30px" }}>
              Key Takeaways
            </h3>
            <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
              <li style={{ marginBottom: "12px" }}>Learn the fundamentals and best practices</li>
              <li style={{ marginBottom: "12px" }}>Implement real-world solutions</li>
              <li style={{ marginBottom: "12px" }}>Improve your development workflow</li>
              <li style={{ marginBottom: "12px" }}>Stay updated with latest trends</li>
            </ul>
          </div>
        </motion.div>

        {/* RELATED POSTS */}
        {relatedPosts.length > 0 && (
          <motion.section
            className="relatedPosts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2>Related Articles</h2>
            <div className="relatedGrid">
              {relatedPosts.map(relatedPost => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </motion.section>
        )}

      </motion.div>
    </Layout>
  );
}

export function getStaticProps(context) {
  const { id } = context.params;
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return {
      notFound: true,
      revalidate: 3600
    };
  }

  // Get related posts (same category, different post)
  const relatedPosts = posts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return {
    props: { post, relatedPosts },
    revalidate: 3600 // Revalidate every hour
  };
}

export function getStaticPaths() {
  const paths = posts.map(post => ({
    params: { id: String(post.id) }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}