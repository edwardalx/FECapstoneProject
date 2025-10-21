import { create } from "zustand";

export const useTokenStore = create((set) => ({
  token: JSON.parse(localStorage.getItem("access_token")) || "",
  user: "",
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
}));
