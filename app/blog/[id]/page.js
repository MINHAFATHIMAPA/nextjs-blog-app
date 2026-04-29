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
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data);

        // ✅ FIX: string ID comparison
        const found = data.find(p => p.id === id);
        setPost(found);
      });
  }, [id]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  // ✅ FIX: index-based navigation
  const currentIndex = posts.findIndex(p => p.id === id);
  const prevPost = posts[currentIndex - 1];
  const nextPost = posts[currentIndex + 1];

  const blocks = post.content.split("\n\n");

  return (
    <div className="p-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

      {/* LEFT SIDE */}
      <div className="md:col-span-2">

        {/* IMAGE */}
        {post.images && <ImageCarousel images={post.images} />}

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-8 text-center">
          {post.title}
        </h1>

        {/* CONTENT */}
        <div className="space-y-6 text-gray-700 leading-8">

          {blocks.map((block, index) => {

            // HEADINGS
            if (block.trim().startsWith("#")) {
              return (
                <h2 key={index} className="text-3xl font-bold text-amber-800 mt-10">
                  {block.replace("#", "")}
                </h2>
              );
            }

            // DIVIDER
            if (block.trim() === "---") {
              return <hr key={index} className="my-6" />;
            }

            // FLASHCARD
            if (block.includes("👉")) {
              return (
                <div key={index} className="bg-amber-50 p-4 border-l-4 border-amber-700 rounded">
                  {block.replace("👉", "")}
                </div>
              );
            }

            // BULLETS
            if (block.includes("•")) {
              const items = block.split("\n").filter(i => i.includes("•"));

              return (
                <ul key={index} className="list-disc pl-6">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace("•", "")}</li>
                  ))}
                </ul>
              );
            }

            // TABLE
            if (block.includes("|")) {
              const rows = block.split("\n").map(r => r.split("|").filter(Boolean));

              return (
                <table key={index} className="w-full border">
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="border p-2">
                            {cell.trim()}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            }

            // NORMAL TEXT + VIDEO
            return (
              <div key={index}>
                <p>{block}</p>

                {index === 1 && post.video && (
                  <div className="mt-6 aspect-video">
                    <iframe
                      src={post.video}
                      className="w-full h-full rounded"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* FAQ */}
        {post.faq && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h2>

            {post.faq.map((item, index) => (
              <div key={index} className="mb-4 border p-4 rounded">

                <button
                  onClick={() =>
                    setOpenFAQ(openFAQ === index ? null : index)
                  }
                  className="w-full text-left font-semibold flex justify-between"
                >
                  {item.question}
                  <span>{openFAQ === index ? "-" : "+"}</span>
                </button>

                {openFAQ === index && (
                  <p className="mt-2 text-gray-600">
                    {item.answer}
                  </p>
                )}

              </div>
            ))}
          </div>
        )}

        {/* NAVIGATION */}
        <div className="flex justify-between mt-10">

          <button
            onClick={() => prevPost && router.push(`/blog/${prevPost.id}`)}
            disabled={!prevPost}
          >
            <HiArrowLongLeft />
          </button>

          <button
            onClick={() => nextPost && router.push(`/blog/${nextPost.id}`)}
            disabled={!nextPost}
          >
            <HiArrowLongRight />
          </button>

        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="space-y-4">

        <h3 className="font-bold text-xl">
          More Articles
        </h3>

        {posts
          .filter(p => p.id !== id) // ✅ FIXED
          .map(p => (
            <div
              key={p.id}
              className="cursor-pointer border p-2 rounded"
              onClick={() => router.push(`/blog/${p.id}`)}
            >
              <img
                src={p.images?.[0]}
                className="w-full h-24 object-cover rounded"
              />
              <p className="text-sm font-semibold mt-2">
                {p.title}
              </p>
            </div>
          ))}

      </div>

    </div>
  );
}