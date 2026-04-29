"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    content: "",
    images: "",
    video: "",
    faq: ""
  });

  // 🔥 FETCH EXISTING POST
  useEffect(() => {
    fetch(`/api/posts`)
      .then(res => res.json())
      .then(data => {
        const post = data.find(p => p.id === id);

        if (post) {
          setForm({
            title: post.title,
            content: post.content,
            images: post.images?.join(", "),
            video: post.video || "",
            faq: post.faq
              ?.map(f => `${f.question}|${f.answer}`)
              .join("\n")
          });
        }
      });
  }, [id]);

  // 🔥 UPDATE POST
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedPost = {
      id,
      title: form.title,
      content: form.content,
      images: form.images
        ? form.images.split(",").map(i => i.trim())
        : [],
      video: form.video,
      faq: form.faq
        ? form.faq.split("\n").map(f => {
            const [q, a] = f.split("|");
            return {
              question: q?.trim(),
              answer: a?.trim()
            };
          })
        : []
    };

    await fetch("/api/posts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY
      },
      body: JSON.stringify(updatedPost)
    });

    alert("Post Updated ✅");
    router.push("/blog");
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>

      <form onSubmit={handleUpdate} className="space-y-4">

        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2"
          placeholder="Title"
        />

        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full border p-2"
          placeholder="Content"
        />

        <input
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
          className="w-full border p-2"
          placeholder="Images (comma separated)"
        />

        <input
          value={form.video}
          onChange={(e) => setForm({ ...form, video: e.target.value })}
          className="w-full border p-2"
          placeholder="YouTube embed link"
        />

        <textarea
          value={form.faq}
          onChange={(e) => setForm({ ...form, faq: e.target.value })}
          className="w-full border p-2"
          placeholder="FAQ (question|answer per line)"
        />

        <button className="bg-black text-white px-4 py-2">
          Update
        </button>

      </form>
    </div>
  );
}