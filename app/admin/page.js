"use client";
import { useState } from "react";

export default function Admin() {

  // 🔐 Access control
  const [access, setAccess] = useState(false);
  const [password, setPassword] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
    images: "",
    video: "",
    faq: ""
  });

  // 🔐 PASSWORD SCREEN
  if (!access) {
    return (
      <div className="h-screen flex flex-col justify-center items-center gap-4">
        <h1 className="text-xl font-bold">Enter Admin Password</h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
          placeholder="Password"
        />

        <button
          onClick={() => {
            // 🔥 CHANGE HERE (from .env later)
            if (password === "admin123") {
              setAccess(true);
            } else {
              alert("Wrong password ❌");
            }
          }}
          className="bg-black text-white px-4 py-2"
        >
          Enter
        </button>
      </div>
    );
  }

  // 🚀 SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      alert("Title & Content required ❌");
      return;
    }

    const newPost = {
      title: form.title,
      content: form.content,
      images: form.images
        ? form.images.split(",").map((img) => img.trim())
        : [],
      video: form.video,
      faq: form.faq
        ? form.faq.split("\n").map((f) => {
            const [question, answer] = f.split("|");
            return {
              question: question?.trim() || "",
              answer: answer?.trim() || ""
            };
          })
        : []
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY // 🔥 use env
        },
        body: JSON.stringify(newPost)
      });

      const data = await res.json();
      console.log("API RESPONSE:", data);

      if (data.success) {
        alert("Post Added ✅");

        setForm({
          title: "",
          content: "",
          images: "",
          video: "",
          faq: ""
        });

        window.location.href = "/blog";
      } else {
        alert("Error: " + data.error);
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          value={form.title}
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2"
        />

        <textarea
          value={form.content}
          placeholder="Content"
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full border p-2"
        />

        <input
          value={form.images}
          placeholder="Images (comma separated URLs)"
          onChange={(e) => setForm({ ...form, images: e.target.value })}
          className="w-full border p-2"
        />

        <input
          value={form.video}
          placeholder="YouTube embed link"
          onChange={(e) => setForm({ ...form, video: e.target.value })}
          className="w-full border p-2"
        />

        <textarea
          value={form.faq}
          placeholder="FAQ (question|answer per line)"
          onChange={(e) => setForm({ ...form, faq: e.target.value })}
          className="w-full border p-2"
        />

        <button className="bg-black text-white px-4 py-2">
          Submit
        </button>

      </form>
    </div>
  );
}