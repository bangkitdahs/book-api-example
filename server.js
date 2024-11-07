const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let books = []; // In-memory array to store books

// Create a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Get a single book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
});

// Update a book by ID
app.put("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");

  const { title, author } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;

  res.json(book);
});

// Delete a book by ID
app.delete("/books/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send("Book not found");

  const deletedBook = books.splice(bookIndex, 1);
  res.json(deletedBook);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
