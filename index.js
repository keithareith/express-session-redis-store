const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

/**
 * Creates and configures an Express session with Redis as the store.
 *
 * @param {Object} redisConfig Configuration for the Redis client.
 * @param {Object} sessionConfig Configuration for the session middleware.
 * @returns {Function} Express middleware for session handling.
 */
function createRedisSession(redisConfig = {}, sessionConfig = {}) {
  // Set default values for Redis client
  const defaultRedisConfig = {
    // Default configuration would work for local development environments.
    // For production or specific use cases, pass the configuration object.
  };

  // Create a Redis client with the provided configuration
  let redisClient = redis.createClient({ ...defaultRedisConfig, ...redisConfig });

  redisClient.on('error', function (err) {
    console.error('Could not establish a connection with Redis. ' + err);
  });

  redisClient.on('connect', function () {
    console.log('Connected to Redis successfully');
  });

  // Set default values for session configuration
  const defaultSessionConfig = {
    store: new RedisStore({ client: redisClient }),
    secret: 'your secret', // Should be overridden for security reasons
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true, requires an https-enabled website
      httpOnly: true, // if true, prevents client-side JS from reading the cookie
      maxAge: 1000 * 60 * 10 // session max age in milliseconds
    }
  };

  // Return configured session middleware
  return session({ ...defaultSessionConfig, ...sessionConfig });
}

module.exports = createRedisSession;
