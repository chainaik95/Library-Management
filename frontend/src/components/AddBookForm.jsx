import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { createBook } from "../api/booksApi"; // adjust path
import { validateAvailable } from "./Validation";

export default function AddBookForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [isbn, setIsbn] = useState("");

  const [publisher, setPublisher] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [category, setCategory] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [availableCopies, setAvailableCopies] = useState("");
  const [error, setError] = useState("");

  const handleAvailableChange = (e) => {
    const val = Number(e.target.value);
    setAvailableCopies(val);
    const validationMsg = validateAvailable(Number(totalCopies), val);
    setError(validationMsg);
  };

  const handleSubmit = async (e) => {
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
      const resp = await createBook(payload);
      console.log("Created:", resp);
      if (onCreated) onCreated(resp);
      // reset form fields...
    } catch (err) {
      console.error("Error creating book", err);
      alert("Failed to create book — see console for details");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
    >
      <Typography variant="h6" mb={2}>
        Add New Book
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
        Add Book
      </Button>
    </Box>
  );
}
