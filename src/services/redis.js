const redis = require ('redis');

// Create a Redis client
const client = redis.createClient ({
  host: 'localhost', // Redis server address
  port: 6379, // Redis server port
  // If your Redis server requires authentication, add the following line:
  // password: 'your_redis_password',
});

// Check if the client is connected successfully
client.on ('connect', () => {
  console.log ('Connected to Redis server');
});

// Handle Redis connection errors
client.on ('error', err => {
  console.error ('Error connecting to Redis:', err);
});

const getData = async key => {
  return await client.get (key);
};

module.exports = {
  getData,
};
