import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { editBook } from "../api/booksApi"; // adjust path
import { validateAvailable } from "./Validation";

export default function EditBookForm({ initialValues, onUpdated }) {
  const id = initialValues._id;
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [isbn, setIsbn] = useState("");

  const [publisher, setPublisher] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [category, setCategory] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [availableCopies, setAvailableCopies] = useState("");
  
  const [error, setError] = useState("");

  useEffect(() => {
    // run when initialValues changes
    setTitle(initialValues.title ?? "");
    setAuthors(
      (initialValues.authors && initialValues.authors.join(", ")) ?? ""
    );
    setIsbn(initialValues.isbn ?? "");
    setPublisher(initialValues.publisher ?? "");
    setPublishedDate(initialValues.publishedDate ?? "");
    setCategory(initialValues.category ?? "");
    setTotalCopies(initialValues.totalCopies ?? "");
    setAvailableCopies(initialValues.availableCopies ?? "");
  }, [initialValues]);

  const handleAvailableChange = (e) => {
    const val = Number(e.target.value);
    setAvailableCopies(val);
    const validationMsg = validateAvailable(Number(totalCopies), val);
    setError(validationMsg);
  };

  const updateSave = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      isbn,
      authors: authors
        .split(",")
        .map((a) => a.trim())
        .filter((a) => a),
      publisher,
      publishedDate,
      category,
      totalCopies: totalCopies ? Number(totalCopies) : undefined,
      availableCopies: availableCopies ? Number(availableCopies) : undefined,
    };

    try {
      const resp = await editBook(id, payload);
      console.log("Updated:", resp);
      const updated = resp.updatedrow ?? resp.newrows?.[0] ?? resp;
      if (onUpdated) onUpdated(updated);
      // reset form fields...
    } catch (err) {
      console.error("Error updating book", err);
      alert("Failed to update book — see console for details");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={updateSave}
      sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
    >
      <Typography variant="h6" mb={2}>
        Update Book
      </Typography>

      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Authors (comma separated)"
        value={authors}
        onChange={(e) => setAuthors(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Publisher"
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Published Date"
        value={publishedDate}
        onChange={(e) => setPublishedDate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Total Copies"
        type="number"
        value={totalCopies}
        onChange={(e) => setTotalCopies(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Available Copies"
        type="number"
        value={availableCopies}
        onChange={handleAvailableChange}
        fullWidth
        margin="normal"
        error={Boolean(error)}
        helperText={error}
      />

      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Save
      </Button>
    </Box>
  );
}
