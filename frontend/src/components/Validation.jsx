import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { createBook } from "../api/booksApi";

export function validateAvailable(total, available) {
  if (total !== "" && available > total) {
    return "Available copies cannot exceed total copies";
  } else {
    return "";
  }
}
