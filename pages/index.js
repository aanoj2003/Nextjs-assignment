import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import DashboardStats from "../components/DashboardStats";
import { useState } from "react";
import { motion } from "framer-motion";
import { posts as allPosts } from "../data/posts";

export default function Home({ posts }) {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(posts.map(p => p.category))];

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || post.category === category)
  );

  const featuredPost = posts[0];

  return (
    <Layout>

      {/* HERO SECTION */}
      <motion.section
        className="heroSection"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Welcome to Blog Dashboard</h1>
        <p>Explore latest articles, trends and tutorials.</p>
      </motion.section>

      {/* STATS */}
      <DashboardStats posts={posts} />

      {/* FEATURED POST */}
      {featuredPost && (
        <section className="featuredSection">

          <h2 className="sectionTitle">⭐ Featured Article</h2>

          <div className="featuredCard">
            <img src={featuredPost.image} />

            <div>
              <span className="categoryBadge">
                {featuredPost.category}
              </span>

              <h2>{featuredPost.title}</h2>

              <p>{featuredPost.content.substring(0, 150)}...</p>

            </div>
          </div>

        </section>
      )}

      {/* FILTER BAR */}
      <section className="filterBar">

        <input
          placeholder="🔍 Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

      </section>

      {/* POSTS GRID */}
      <section>
        <h2 className="sectionTitle">Latest Posts</h2>

        {filteredPosts.length === 0 ? (
          <p className="emptyState">No posts found.</p>
        ) : (
          <div className="grid">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

    </Layout>
  );
}

export function getStaticProps() {
  return {
    props: { posts: allPosts },
    revalidate: 3600 // Revalidate every hour
  };
}