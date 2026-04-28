import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-5 bg-white shadow-sm">
      <h1 className="font-bold text-lg">minnaahh ✨</h1>

      <div className="flex gap-6 text-gray-600">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/create">Create</Link>
      </div>
    </nav>
  );
}