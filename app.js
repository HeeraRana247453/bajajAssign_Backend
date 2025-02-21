const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Enable CORS for your frontend URL
app.use(
  cors({
    origin: "https://bajaj-assign-frontend.vercel.app",  // Your frontend's production URL
    credentials: true,  // Allows cookies to be sent with the request
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Add OPTIONS method
    allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
  })
);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST Method to handle the /bfhl endpoint
app.post("/bfhl", (req, res) => {
  const { data } = req.body; // Data array sent in the request body

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid input data." });
  }

  // Separate numbers and alphabets
  const numbers = [];
  const alphabets = [];

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item); // if the item is a number
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item); // if the item is an alphabet (single character)
    }
  });

  // Find the highest alphabet (lexicographically largest, case-insensitive)
  let highest_alphabet = [];
  if (alphabets.length > 0) {
    highest_alphabet = [alphabets.reduce((max, current) =>
      current.toUpperCase() > max.toUpperCase() ? current : max)];
  }

  // Prepare response
  const response = {
    is_success: true,
    user_id: "john_doe_17091999",  // Example user ID, replace with your own format
    email: "john@xyz.com",  // Example email
    roll_number: "ABCD123",  // Example roll number
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: highest_alphabet
  };

  res.json(response);
});

// GET Method to handle the /bfhl endpoint
app.get("/bfhl", (req, res) => {
  // Static response for GET request
  res.status(200).json({ operation_code: 1 });
});

// Preflight request (OPTIONS)
app.options("/bfhl", cors({
  origin: "https://bajaj-assign-frontend.vercel.app",  // Your frontend URL for preflight
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Start the server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
