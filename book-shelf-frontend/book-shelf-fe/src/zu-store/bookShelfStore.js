import getBooks from '../Services/BooksService';
import { create } from 'zustand';

export const useBookStore = create((set) => ({  
  books: [],

  setBooks: (newBook) => set(() => ({ books:newBook })),
filteredData:[],
setFilteredData: (filteredBooks) => set(()=>({filteredData:filteredBooks}))
}));