import getBooks from '../effectHelpers/fetchBooks';
import { create } from 'zustand';

export const useStore = create((set) => ({  
  books: [],

fetchBooks: async () => {
    const data = await getBooks();
    set({books: data})
} 
//   increase: () => set((state) => ({ count: state.count + 1 })),
//   decrease: () => set((state) => ({ count: state.count - 1 })),
}));