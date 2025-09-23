"use client";

import React, { useEffect } from "react";
import { useComments } from "@/store/comments";
import Link from "next/link";

type Props = { params: Promise<{ postId: string }> | { postId: string } };

export default function PostCommentsPage({ params }: Props) {
  // Next.js may supply `params` as a Promise; unwrap with React.use()
  // React.use expects a "Usable"; cast through unknown->any to avoid type error
  // at compile time while still unwrapping a promised params at runtime.
  const resolvedParams = React.use(params as unknown as any) as { postId: string };
  const postId = Number(resolvedParams.postId);
  const { items, loading, error, fetchData } = useComments();

  useEffect(() => {
    if (!isNaN(postId)) fetchData(postId);
  }, [postId, fetchData]);

  if (loading) return <p className="p-6">กำลังโหลดความคิดเห็น...</p>;
  if (error) return <p className="p-6">ผิดพลาด: {error}</p>;

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-poppins text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4]">
            Comments — Post {postId}
          </h1>
          <Link href="/post-client" className="text-sm text-zinc-600 hover:underline">
            ← Back to posts
          </Link>
        </div>

        <div className="space-y-4">
          {items.map((c) => (
            <div key={c.id} className="rounded-lg p-4 glass border border-transparent hover:border-[rgba(139,92,246,0.12)] transition">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[var(--text)]">{c.name}</div>
                  <div className="text-xs text-zinc-500">{c.email}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
