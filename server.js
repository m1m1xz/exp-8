const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// In-memory array acting as our database
let books = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
  { id: 2, title: 'Atomic Habits', author: 'James Clear' }
];

// 1. READ: Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// 2. READ: Get a single book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// 3. CREATE: Add a new book
app.post('/books', (req, res) => {
  const newBook = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// 4. UPDATE: Modify an existing book by ID
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  res.json(book);
});

// 5. DELETE: Remove a book by ID
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

  const deletedBook = books.splice(bookIndex, 1);
  res.json({ message: 'Book deleted successfully', deletedBook: deletedBook[0] });
});
// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Book API! Go to /books to see all books.');
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});