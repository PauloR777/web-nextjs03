// src/app/(user)/post-client/page.tsx

"use client";

import { usePosts } from "@/store/posts";
import Link from "next/link";
import { useEffect } from "react";

export default function Page() {
  const { items, loading, error, fetchData } = usePosts();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p>กำลังโหลด...</p>;
  if (error) return <p>ผิดพลาด: {error}</p>;

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-poppins text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] mb-6">Posts</h1>

        <ul className="space-y-4">
          {items.map((post, index) => (
            <li key={post.id} className="rounded-lg p-4 glass border border-transparent hover:border-[rgba(139,92,246,0.12)] transition">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-zinc-500">Post #{index + 1}</div>
                  <h2 className="mt-1 text-lg font-semibold text-[var(--text)]">{post.title}</h2>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{post.body}</p>
                </div>
                <div className="flex-shrink-0">
                  <Link href={`/post-client/${post.id}`} className="px-3 py-1 rounded-full text-sm font-medium text-white" style={{ background: 'linear-gradient(90deg,#8b5cf6,#06b6d4)' }}>
                    ดูความคิดเห็น
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}