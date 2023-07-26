# FeedSearch


 Feed Search and Sort API

This project implements a backend API for searching, sorting, and paginating a feed. It allows searching in fields `name` and `description` and supports exact match when the query contains a phrase within double quotes. The API also provides sorting options for `name` and `dateLastEdited`.

Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v14 or later)
- npm (Node Package Manager)

Installation

1. Clone the repository:

```bash
git clone https://github.com/nehakalbande/FeedSearch.git
cd FeedSearch
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
node app.js
```

The server will start running at `http://localhost:3000`.

## Usage

The API provides the following endpoints:

- `GET /api/posts`: Search, sort, and paginate the feed.

For detailed documentation on how to use each endpoint, please refer to the [API Endpoints](#api-endpoints) section below.

## API Endpoints

### `GET /api/posts`

Search, sort, and paginate the feed.

Query Parameters:

- `q` (optional): Search term. If not provided, all posts match the query. Supports exact match with double quotes.
- `sortBy` (optional): Sort the posts by `name` or `dateLastEdited`. Default is `name`.
- `page` (optional): Page number for pagination. Default is `1`.

Response:

```json
{
  "posts": [
    {
      "name": "Post 1",
      "description": "Description of Post 1",
      "dateLastEdited": "2023-07-23T14:30:00.000Z"
    },
    // Other posts...
  ],
  "totalCount": 100,
  "totalPages": 20,
  "currentPage": 1
}
```

## Testing

To run the unit and integration tests, use the following command:

```bash
npm test
```
