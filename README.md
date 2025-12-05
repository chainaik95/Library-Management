# Library Management System (MERN)

A simple web-based Library Management System built with the MERN stack (MongoDB, Express, React, Node.js).  
This application lets a librarian manage book records: add new books, update existing book details or availability, delete books, view/search the catalog, and check availability — all CRUD operations + search are supported.

## 📚 Features

- **Create** — Add new books (title, author, ISBN, number of copies / availability, etc.)  
- **Read** — View list of all books; search books by title, author, or ISBN  
- **Update** — Edit book details and update availability / number of copies  
- **Delete** — Remove books from the library catalog  
- **Search & Filter** — Quick search functionality to find books by title, author, ISBN or other criteria  

> ⚠️ **Note**: Currently there is **no member / user management** (no member accounts, borrowing, or user roles). Only the librarian (you) can access and manage book data.

## 🛠️ Tech Stack & Tools Used

- **Frontend**: React.js  
- **Backend**: Node.js + Express.js (REST API)  
- **Database**: MongoDB  
- **ORM / ODM**:  Mongoose for MongoDB schema & queries  
- Environment variables configured using a `.env` file (for DB connection string, server port, etc.)  

## 🚀 Getting Started / Installation

### Prerequisites

- Node.js and npm installed  
- MongoDB (local or remote)  
- Web browser  

### Setup & Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/Library-Management.git
cd Library-Management

# Install backend dependencies
cd backend   # or server, depending on your folder structure
npm install

# Setup environment variables
# create a `.env` file (or copy `.env.example`) and set:
#   MONGODB_URI=<your MongoDB connection string>
#   PORT=<server port, e.g. 5000>

# Start backend server
npm start     # or `npm run dev` if you use nodemon

# In a second terminal: install and start frontend
cd ../frontend  # or client
npm install
npm start     # or `npm run dev`
Then open your browser at http://localhost:3000 (or the port configured) to view the app.

📂 Project Structure (example)
bash
Copy code
/ (root)
├── frontend / client         # React front-end application
│   ├── public
│   └── src
│       ├── components / pages
│       └── ...
├── backend / server          # Node + Express backend
│   ├── models                # MongoDB schemas (Book, etc.)
│   ├── routes                # API routes (books CRUD)
│   ├── controllers           # Logic for API endpoints
│   └── index.js              # Backend entry point
├── .env / .env.example        # Environment variables (DB URI, PORT)  
├── README.md                 # This file  
└── package.json(s)           # npm configs for client & server
✅ Usage / How It Works
Use the web UI to add new books, with details like title, author, ISBN, copies/availability.

View all books or search for a specific book by title, author or ISBN.

Update book information or adjust availability/copies when needed.

Delete a book from the library catalog if it’s no longer available.

Since the system currently has no user/member management, all operations are done by librarian via the UI.