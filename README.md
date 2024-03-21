# Express Session Redis Library

A simple and configurable library to integrate Redis with Express session for scalable session management.

## Features

- Easy integration with Express apps.
- Configurable Redis and session parameters.
- Scalable session management using Redis.

## Installation

To install the library, run the following command in your terminal:

```bash
npm install <your-library-name>
```

Make sure you have Redis installed and running on your machine or accessible via network.

## Usage

First, require the library in your Express application:

```javascript
const express = require('express');
const createRedisSession = require('<your-library-name>');
```

Then, use the library to add session management to your application:

```javascript
const app = express();

// Optional: Configuration for Redis and session
const redisConfig = {
  host: 'localhost',
  port: 6379
// Add other Redis configurations here
};

const sessionConfig = {
  secret: 'your secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 10
  }
// Add other session configurations here
};

app.use(createRedisSession(redisConfig, sessionConfig));

// Define routes
app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.end(`Views: \${req.session.views}`);
  } else {
    req.session.views = 1;
    res.end('Welcome to your first visit!');
  }
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:\${port}`);
});
```

## Configuration

The library accepts two parameters for configuration:

- `redisConfig`: Configuration for the Redis client.
- `sessionConfig`: Configuration for the express-session middleware.

Refer to the Redis and express-session documentation for more details on configuration options.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to suggest improvements or add new features.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
