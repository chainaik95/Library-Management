const mongoose = require("mongoose");
const Book = require("../models/bookModel");

async function createBooks(req, res, next) {
  const payload = req.body;
  const newrows = Array.isArray(payload) ? payload : [payload];

  try {
    for (const b of newrows) {
      if (!b.title || !b.isbn || !b.authors|| b.authors.length === 0)
        return res
          .status(400)
          .json({ error: "title,author &isbn are required" });
    }
    const inserted = await Book.insertMany(newrows, { ordered: false });
    return res
      .status(201)
      .json({
        message: `${inserted.length} rows are inserted`,
        newrows: inserted,
      });
  } catch (err) {
    console.error("Book Insertion error: ", err);
    if (err.code === 11000)
      return res.status(409).json({ error: "Duplicate ISBN found" });

    res.status(500).json({ error: "failed to insert" });
  }
}

async function getBooks(req, res) {
  try {
    const retrivedData = await Book.find();
    res
      .status(200)
      .json({
        Message: `${retrivedData.length} books are retrieved`,
        Book: retrivedData,
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ Error: "Failed to retrieve books" });
  }
}

async function getBooksById(req, res, next) {
  try {
    const id = req.params.id; // read id from route params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid book id" });
    }

    const retrievedDataById = await Book.findById(id).lean();

    if (!retrievedDataById) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res
      .status(200)
      .json({ message: "Book details received", book: retrievedDataById });
  } catch (err) {
    console.error("getBooksById error:", err);
    return next(err); // pass to centralized error handler
  }
}


async function getBooksBytitle(req, res, next) {
  try {
       const title = req.params.title;
    //console.log(title) // read id from route params

    if (!title || String(title).trim() === "") {
      // optional: return all books if you prefer, but here we ask the client to provide title
      return res.status(400).json({ error: "Query param 'title' is required" });
    }


     const escaped = String(title).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "i");

     const retrievedDataBytitle = await Book.find({ title: regex }).lean();

     console.log(retrievedDataBytitle);

    if (!retrievedDataBytitle) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res
      .status(200)
      .json({ message:`${retrievedDataBytitle.length} book(s) found` ,book: retrievedDataBytitle });
  } catch (err) {
    console.error("getBooksBytitle error:", err);
    return next(err); // pass to centralized error handler
  }
}



async function deleteBooksById(req, res, next) {
  try {
    const id = req.params.id; // read id from route params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid book id" });
    }

    const deleted = await Book.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Book ID not found" });
    }
    return res
      .status(200)
      .json({ message: "Book deleted successfully", book: deleted });
  } catch (err) {
    console.error("deleteBooksById error:", err);
    return next(err); // pass to centralized error handler
  }
}

async function Updaterow(req, res, next) {
  const id = req.params.id;
  const newdata = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: "Pass ID in URL" });

        if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid book id' });
    }

    }

    if (!newdata.title || !newdata.isbn || !newdata.authors|| newdata.authors.length === 0) {
      return res.status(400).json({ error: "title,author &isbn are required" });
    }
    
     const updated = await Book.findByIdAndUpdate(
      id,
      { $set: newdata }, 
      { new: true, runValidators: true }
    ).lean(); 

    if (!updated) {
      return res.status(400).json({ error: "No book found to update" });
    }

    return res
      .status(200)
      .json({ message: "Row updated", updatedrow: updated });
  } catch (err) {
    console.error("Book update error: ", err);
    if (err.code === 11000)
      return res.status(409).json({ error: "Duplicate ISBN found" });
    return next(err);
  }
}



async function Updatepartialrow(req, res, next) {
  
  try {
    const id = req.params.id;
     const newdata = req.body;
  
    if (!id) {
      return res.status(400).json({ error: "{Pass ID in URL}" });
    }
        if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid book id' });
    }

    const allowed = [
      'title', 'authors', 'isbn', 'publisher',
      'publishedDate', 'category', 'totalCopies', 'availableCopies'
    ];

     const updates = {};

       for (const key of Object.keys(newdata || {}))
        {
if (allowed.includes(key))
        {updates[key]   =newdata[key]}

       }

        if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields provided to update' });
    }
    

     const updated = await Book.findByIdAndUpdate(
      id, 
      { $set: updates }, 
      { new: true, runValidators: true, context: 'query' }
    ).lean(); 

    if (!updated) {
      return res.status(404).json({ error: "No book found to update" });
    }

    return res
      .status(200)
      .json({ message: "Row updated", updatedrow: updated });
  } catch (err) {
    console.error("Book update error: ", err);
    if (err.code === 11000)
      return res.status(409).json({ error: "Duplicate ISBN found" });
    return next(err);
  }
}


async function clearBooks(req, res, next) {
  try {
    const result = await Book.deleteMany({}); // delete all books
    res.status(200).json({ message: `${result.deletedCount} books deleted` });
  } catch (err) {
    console.error("Error clearing books:", err);
    return next(err);
  }
}




module.exports = {
  createBooks,
  getBooks,
  getBooksById,
  getBooksBytitle,
  deleteBooksById,
  Updaterow,
  Updatepartialrow,
  clearBooks
};