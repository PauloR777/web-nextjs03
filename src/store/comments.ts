// src/store/comments.ts

"use client";

import { create } from "zustand";
import axios from "axios";

type Comment = { id: number; name: string; email: string; body: string };

type State = {
  items: Comment[];
  loading: boolean;
  error: string | null;
  fetchData: (postId: number) => Promise<void>;
};

export const useComments = create<State>((set) => ({
  items: [],
  loading: false,
  error: null,
  fetchData: async (postId: number) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get<Comment[]>(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      set({ items: data });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },
}));
