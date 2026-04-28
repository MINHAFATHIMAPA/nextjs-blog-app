"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");   // ✅ NEW
  const router = useRouter();

  const handleSubmit = async () => {
    await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, image }), // ✅ include image
    });

    alert("Post created!");
    router.push("/blog");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>

      {/* TITLE */}
      <input
        className="border p-2 block mb-2 w-full"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* CONTENT */}
      <textarea
        className="border p-2 block mb-2 w-full"
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
      />

      {/* IMAGE URL */}
      <input
        className="border p-2 block mb-2 w-full"
        placeholder="Image URL (paste link)"
        onChange={(e) => setImage(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white p-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}