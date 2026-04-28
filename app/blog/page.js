"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-10">

      {/* TITLE */}
      <motion.h1
        className="text-3xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Articles ✨
      </motion.h1>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-8">

        {posts.map((post, index) => (

          <motion.div
            key={post.id}

            className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg overflow-hidden"

            // 🎬 SCROLL REVEAL
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}

            // ⏳ STAGGER EFFECT
            transition={{ duration: 0.6, delay: index * 0.15 }}

            // ✨ HOVER LIFT
            whileHover={{ scale: 1.05 }}
          >

            {/* IMAGE SECTION */}
            <div className="overflow-hidden relative">

             <img
  src={post.images?.[0]}
  alt={post.title}
  className="w-full h-56 object-cover"
/>

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition"></div>

            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h2 className="text-xl font-semibold mb-2">
                {post.title}
              </h2>

              <p className="text-gray-500 mb-4">
                {post.content.substring(0, 80)}...
              </p>

              {/* BUTTON */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/blog/${post.id}`}
                  className="text-black font-medium"
                >
                  Read More →
                </Link>
              </motion.div>

            </div>

          </motion.div>

        ))}

      </div>
    </div>
  );
}