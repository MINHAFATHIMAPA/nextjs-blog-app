"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      });
  }, []);

  // 🔐 SECRET ADMIN TRIGGER (double click title)
  const enableAdmin = () => {
    const pass = prompt("Enter admin password:");

    if (pass === "admin123") {
      setIsAdmin(true);
      alert("Admin mode enabled ✅");
    } else {
      alert("Wrong password ❌");
    }
  };

  // 🔥 DELETE
  const handleDelete = async (e, id) => {
    e.stopPropagation();

    if (!confirm("Delete this post?")) return;

    await fetch("/api/posts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY
      },
      body: JSON.stringify({ id })
    });

    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">

      {/* 👇 DOUBLE CLICK HERE TO ENABLE ADMIN */}
      <h1
        onDoubleClick={enableAdmin}
        className="text-3xl font-bold text-center mb-10 cursor-pointer"
      >
        My Articles ✨
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {posts.map(post => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow cursor-pointer"
            onClick={() => router.push(`/blog/${post.id}`)}
          >
            <img
              src={post.images?.[0]}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h2 className="font-bold text-lg mb-2">
                {post.title}
              </h2>

              <p className="text-sm text-gray-600 line-clamp-2">
                {post.content}
              </p>

              <p className="mt-2 text-sm text-blue-600">
                Read More →
              </p>

              {/* 🔐 ADMIN CONTROLS */}
              {isAdmin && (
                <div className="flex gap-4 mt-4">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/admin/edit/${post.id}`);
                    }}
                    className="text-blue-500 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => handleDelete(e, post.id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>

                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}