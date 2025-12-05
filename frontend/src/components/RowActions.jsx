import React from "react";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditBookForm from "./EditBookForm";

export default function RowActions({ row, onDelete, onEdit }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // console.log(anchorEl);
  const handleDelete = async () => {
    handleClose();
    // confirm before deleting
    const ok = window.confirm(`Delete "${row.title}"?`);
    if (!ok) return;
    console.log(ok);
    // call parent's onDelete with the id (try id first, then _id)
    await onDelete(row.id ?? row._id);
  };

  const handleEdit = async () => {
    handleClose();
    // confirm before deleting
    if (onEdit) onEdit(row);
  };

  return (
    <>
      <IconButton onClick={handleOpen} size="small">
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          Delete
        </MenuItem>
        <MenuItem onClick={handleEdit} sx={{ color: "error.main" }}>
          Edit
        </MenuItem>
      </Menu>
    </>
  );
}
