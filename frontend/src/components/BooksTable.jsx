import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import RowActions from "../components/RowActions";

export default function BooksTable({ books, onDelete, onEdit }) {
  // console.log("BooksTable received:", books);
  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "authors", headerName: "Authors", width: 200 }, // convert array to string
    { field: "isbn", headerName: "ISBN", width: 150 },
    { field: "publisher", headerName: "Publisher", width: 180 },
    { field: "publishedDate", headerName: "Published Date", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "totalCopies", headerName: "Total Copies", width: 130 },
    { field: "availableCopies", headerName: "Available Copies", width: 150 },
    {
      field: "actions",
      headerName: "",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <RowActions row={params.row} onDelete={onDelete} onEdit={onEdit} />
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%", mt: 3 }}>
      <DataGrid
        rows={books}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
}
