import { FaNewspaper, FaFolder, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

export default function DashboardStats({ posts }) {

  const categories = [...new Set(posts.map(p => p.category))];
  const authors = [...new Set(posts.map(p => p.author || "Admin"))];

  const stats = [
    {
      title: "Total Posts",
      value: posts.length,
      icon: <FaNewspaper />,
      color: "purple",
      description: "Published articles"
    },
    {
      title: "Categories",
      value: categories.length,
      icon: <FaFolder />,
      color: "blue",
      description: "Content topics"
    },
    {
      title: "Authors",
      value: authors.length,
      icon: <FaUsers />,
      color: "green",
      description: "Contributors"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="statsGrid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >

      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          className={`statCard ${stat.color}`}
          variants={itemVariants}
          whileHover={{ y: -6 }}
        >

          <div className="statIcon">
            {stat.icon}
          </div>

          <div className="statContent">
            <h3 className="statValue">{stat.value}</h3>
            <p className="statTitle">{stat.title}</p>
            <p className="statDesc">{stat.description}</p>
          </div>

        </motion.div>
      ))}

    </motion.div>
  );
}