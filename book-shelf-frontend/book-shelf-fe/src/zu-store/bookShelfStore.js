import getBooks from '../Services/BooksService';
import { create } from 'zustand';

export const useBookStore = create((set) => ({  
  books: [],

  setBooks: (newBook) => set(() => ({ books:newBook })),
// fetchBooks: async () => {
//     const data = await getBooks();
//     set({books: data})
// } 

//   increase: () => set((state) => ({ count: state.count + 1 })),
//   decrease: () => set((state) => ({ count: state.count - 1 })),
}));