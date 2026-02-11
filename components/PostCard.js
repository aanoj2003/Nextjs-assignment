import Link from "next/link";
import { motion } from "framer-motion";
import { FaClock, FaUserCircle, FaArrowRight } from "react-icons/fa";

export default function PostCard({ post }) {

  return (
    <motion.div
      className="postCard"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >

      {/* IMAGE */}
      <div className="postImageWrapper">
        <motion.img 
          src={post.image} 
          alt={post.title}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <span className="categoryBadge">{post.category}</span>
      </div>

      {/* CONTENT */}
      <div className="postContent">

        <h3 className="postCardTitle">{post.title}</h3>

        <p className="postDesc">
          {post.content.substring(0, 110)}...
        </p>

        {/* META */}
        <div className="postMeta">
          <span title="Author">
            <FaUserCircle /> {post.author || "Admin"}
          </span>

          <span title="Reading Time">
            <FaClock /> {post.readTime || "5 min"}
          </span>
        </div>

        {/* BUTTON */}
        <Link href={`/posts/${post.id}`} className="readMoreBtn">
          Read More <FaArrowRight style={{ fontSize: "12px" }} />
        </Link>

      </div>
    </motion.div>
  );
}