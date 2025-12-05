import axios from "axios";

const API_BASE = "http://localhost:3000/books"; // your backend URL

export const getAllBooks = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const deleteBooksById = async (id) => {
  const response = await axios.delete(`${API_BASE}/${encodeURIComponent(id)}`);
  return response.data;
};

export const getBookByTitle = async (title) => {
  const response = await axios.get(
    `http://localhost:3000/books/search/${encodeURIComponent(title)}`
  );
  return response.data;
};

export const createBook = async (bookData) => {
  const resp = await axios.post(API_BASE, bookData);
  return resp.data;
};

export const editBook = async (id, data) =>
  (await axios.put(`${API_BASE}/${encodeURIComponent(id)}`, data)).data;
