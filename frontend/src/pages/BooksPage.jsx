import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { getAllBooks } from "../api/booksApi";
import { getBookByTitle } from "../api/booksApi";
import { deleteBooksById } from "../api/booksApi";
import BooksTable from "../components/BooksTable";
import SearchBar from "../components/SearchBar";
//import RowActions from "../components/RowActions";
import AddBookForm from "../components/AddBookForm";
import EditBookForm from "../components/EditBookForm";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); //for add form

  const [editOpen, setEditOpen] = useState(false); //for edit form
  const [selectedBook, setSelectedBook] = useState(null); //store selected book for edit

  useEffect(() => {
    loadBooks();
  }, []); //  Fetch all books when the page opens (runs only once)

  const loadBooks = async () => {
    try {
      const data = await getAllBooks();
      console.log("Data fetched from backend:", data);
      const booksArray = Array.isArray(data.Book) ? data.Book : [];
      console.log("Books array after processing:", booksArray);

      const booksWithId = booksArray.map((book) => ({
        ...book,
        id: book._id || book.isbn || index,
      }));
      console.log("After Processing:", booksWithId);
      setBooks(booksWithId);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  //getbook by title api call to backend
  const handleSearch = async (title) => {
    try {
      const data = await getBookByTitle(title);
      console.log("Data fetched from backend:", data);
      const booksArray = Array.isArray(data.book) ? data.book : [];
      console.log("Books array after processing:", booksArray);

      const booksWithId = booksArray.map((book, index) => ({
        ...book,
        id: book._id || book.isbn || index,
      }));
      console.log("After Processing:", booksWithId);
      setBooks(booksWithId);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  const deleteSelected = async (id) => {
    if (!id) return;
    const ok = window.confirm("Are you sure you want to delete this book?");
    if (!ok) return;

    try {
      await deleteBooksById(id);
      // remove from local state (works whether your rows use `id` or `_id`)
      setBooks((prev) => prev.filter((b) => (b.id ?? b._id) !== id));
      console.log("Deleted successfully");
    } catch (err) {
      console.error("Error deleting book", err);
      // optional: show a toast or alert to the user
      // alert("Failed to delete book. Try again.");
    }
  };

  const handleRowEdit = (row) => {
    setSelectedBook(row);
    setEditOpen(true);
  };

  return (
    <Container>
      {" "}
      {/* Main Container */}
      <Typography variant="h4" mt={4} mb={2}>
        Library – Books {/* Header*/}
      </Typography>
      <SearchBar handleSearch={handleSearch} loadBooks={loadBooks} />{" "}
      {/* SearchBar*/}
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Add New Book {/* Add new book button*/}
      </Button>
      <Dialog //add Book Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <AddBookForm //calling AddBookForm component
            onCreated={(data) => {
              setBooks((prev) => [...prev, ...(data.newrows || [data])]);
              setOpenDialog(false); // close popup after add
            }}
          />
        </DialogContent>
        <DialogActions>
          {" "}
          {/* Cancel button dialog actions*/}
          <Button variant="outlined" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog // Edit Book Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <EditBookForm //calling EditBookForm component
            initialValues={selectedBook}
            onUpdated={(updatedBook) => {
              console.log("onUpdated got:", updatedBook);
              setBooks((prev) =>
                prev.map((b) =>
                  (b.id ?? b._id) === (updatedBook.id ?? updatedBook._id)
                    ? updatedBook
                    : b
                )
              );
              setEditOpen(false);
            }}
          />
        </DialogContent>

        <DialogActions>
          {" "}
          {/* Cancel button dialog actions*/}
          <Button variant="outlined" onClick={() => setEditOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* Your existing table */}
      <BooksTable
        books={books}
        onDelete={deleteSelected}
        onEdit={handleRowEdit}
      />
    </Container>
  );
}
