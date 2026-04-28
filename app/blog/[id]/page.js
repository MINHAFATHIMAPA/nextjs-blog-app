"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import ImageCarousel from "@/app/components/ImageCarousel";

export default function Post() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [openFAQ, setOpenFAQ] = useState(null); // ✅ FAQ state

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        const found = data.find(p => p.id === Number(id));
        setPost(found);
      });
  }, [id]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  const prevPost = posts.find(p => p.id === Number(id) - 1);
  const nextPost = posts.find(p => p.id === Number(id) + 1);

  const blocks = post.content.split("\n\n");

  return (
    <div className="p-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

      {/* 🟢 LEFT SIDE (BLOG) */}
      <div className="md:col-span-2">

        {/* 🖼️ IMAGE CAROUSEL */}
        {post.images && <ImageCarousel images={post.images} />}

        {/* 🏷️ TITLE */}
        <h1 className="text-4xl font-bold mb-8 text-center">
          {post.title}
        </h1>

        {/* 📖 CONTENT */}
        <div className="space-y-6 text-gray-700 leading-8">

          {blocks.map((block, index) => {

            // 🔥 HEADINGS
            if (block.trim().startsWith("#")) {
              return (
                <h2
                  key={index}
                  className="text-3xl md:text-4xl font-bold text-amber-800 mt-10 mb-4"
                >
                  {block.replace("#", "")}
                </h2>
              );
            }

            // 🔹 DIVIDER
            if (block.trim() === "---") {
              return <hr key={index} className="my-6 border-gray-300" />;
            }

            // 📦 FLASHCARD
            if (block.includes("👉")) {
              return (
                <div
                  key={index}
                  className="bg-amber-50 border-l-4 border-amber-700 p-4 rounded-lg shadow-sm"
                >
                  <p className="font-medium text-gray-800">
                    {block.replace("👉", "")}
                  </p>
                </div>
              );
            }

            // 🔸 BULLET POINTS
            if (block.includes("•")) {
              const items = block.split("\n").filter(i => i.includes("•"));

              return (
                <ul key={index} className="list-disc pl-6 space-y-2">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace("•", "")}</li>
                  ))}
                </ul>
              );
            }

            // 📊 TABLE
            if (block.includes("|")) {
              const rows = block.split("\n").map(r => r.split("|").filter(Boolean));

              return (
                <div key={index} className="overflow-x-auto">
                  <table className="w-full border rounded-lg">
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={i} className="border-b">
                          {row.map((cell, j) => (
                            <td key={j} className="p-3 text-sm">
                              {cell.trim()}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }

            // 📄 PARAGRAPH + VIDEO
            return (
              <div key={index}>
                <p>{block}</p>

                {index === 1 && post.video && (
                  <div className="relative w-full pt-[56.25%] mt-6">
                    <iframe
                      src={post.video}
                      className="absolute top-0 left-0 w-full h-full rounded-lg shadow"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* ❓ FAQ SECTION */}
        {post.faq && (
          <div className="mt-16">

            <h2 className="text-3xl font-bold text-amber-800 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">

              {post.faq.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 bg-gray-50 shadow-sm"
                >
                  <button
                    onClick={() =>
                      setOpenFAQ(openFAQ === index ? null : index)
                    }
                    className="w-full flex justify-between items-center text-left font-semibold text-lg cursor-pointer"
                  >
                    {item.question}

                    <span className="text-xl">
                      {openFAQ === index ? "−" : "+"}
                    </span>
                  </button>

                  {openFAQ === index && (
                    <p className="mt-3 text-gray-600">
                      {item.answer}
                    </p>
                  )}

                </div>
              ))}

            </div>

          </div>
        )}

        {/* ⬅️➡️ NAVIGATION */}
        <div className="flex justify-between mt-12">

          <button
            onClick={() => prevPost && router.push(`/blog/${prevPost.id}`)}
            className="p-3 rounded-full bg-white shadow hover:scale-110 transition disabled:opacity-30"
            disabled={!prevPost}
          >
            <HiArrowLongLeft />
          </button>

          <button
            onClick={() => nextPost && router.push(`/blog/${nextPost.id}`)}
            className="p-3 rounded-full bg-white shadow hover:scale-110 transition disabled:opacity-30"
            disabled={!nextPost}
          >
            <HiArrowLongRight />
          </button>

        </div>

      </div>

      {/* 🔵 RIGHT SIDE (SIDEBAR) */}
      <div className="space-y-6 sticky top-10">

        <h3 className="text-xl font-bold">
          More Articles
        </h3>

        {posts
          .filter(p => p.id !== Number(id))
          .map(p => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow p-3 hover:scale-105 transition cursor-pointer"
              onClick={() => router.push(`/blog/${p.id}`)}
            >
              <img
                src={p.images?.[0]}
                className="w-full h-32 object-cover rounded mb-2"
              />

              <p className="text-sm font-semibold">
                {p.title}
              </p>
            </div>
          ))}

      </div>

    </div>
  );
}