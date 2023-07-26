const express = require('express');
const bodyParser = require('body-parser');
const data = require('./mock_data.json');

const app = express();
app.use(bodyParser.json());

// Search endpoint
app.get('/api/posts', (req, res) => {
  const searchTerm = req.query.q || ''; 
  const page = parseInt(req.query.page || 1, 10); 
  const pageSize = 5; 

  // Perform the search
  const filteredPosts = data.filter((post) => {
    if (searchTerm === '') {
      return true; 
    } else if (searchTerm.startsWith('"') && searchTerm.endsWith('"')) {
      const exactMatch = searchTerm.slice(1, -1);
      return post.name.toLowerCase() === exactMatch.toLowerCase() || post.description.toLowerCase() === exactMatch.toLowerCase();
    } else {
      const searchWords = searchTerm.toLowerCase().split(' ');
      return searchWords.every(word => post.name.toLowerCase().includes(word) || post.description.toLowerCase().includes(word));
    }
  });

  // Sort the posts based on query parameter (name or dateLastEdited)
  const sortBy = req.query.sortBy || 'name';
  if (sortBy === 'name') {
    filteredPosts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'dateLastEdited') {
    filteredPosts.sort((a, b) => new Date(b.dateLastEdited) - new Date(a.dateLastEdited));
  }

  // Calculate pagination values
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalPosts - 1);

  // Get the current page posts
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex + 1);

  res.json({
    posts: paginatedPosts,
    totalCount: totalPosts,
    totalPages: totalPages,
    currentPage: page
  });
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = server;
