"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10 text-center">

      {/* 🔥 HERO IMAGE */}
      <motion.img
        src="https://tse2.mm.bing.net/th/id/OIP.5St3RHrdfTdJdNjIC-NywQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
        className="w-32 h-32 rounded-full object-cover shadow-lg mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* 🔥 TITLE */}
      <motion.h1
        className="text-4xl font-bold mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Hey! I’m John 👋
      </motion.h1>

      {/* 🔥 SUBTITLE */}
      <motion.p
        className="text-gray-600 mb-6 max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        A passionate learner exploring <b>React</b> ⚛️ and <b>Next.js</b> ⚡.  
        I love building modern web apps and sharing what I learn through articles.
      </motion.p>

     
      {/* 🔥 BUTTON */}
      <Link
        href="/blog"
        className="bg-black text-white px-6 py-3 rounded-full hover:opacity-80 transition"
      >
        Explore My Articles →
      </Link>

    </div>
  );
}