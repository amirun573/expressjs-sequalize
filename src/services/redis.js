const redis = require ('redis');

let redisPort = process.env.REDIS_PORT; // Replace with your redis port
let redisHost = process.env.REDIS_HOST; // Replace with your redis host
const client = redis.createClient ({
  socket: {
    port: redisPort,
    host: redisHost,
  },
});

(async () => {
  // Connect to redis server
  await client.connect ();
}) ();

console.log ('Attempting to connect to redis');
client.on ('connect', () => {
  console.log ('Connected to Redis Server!');
});

// Log any error that may occur to the console
client.on ('error', err => {
  console.log (`Error:${err}`);
});

// Close the connection when there is an interrupt sent from keyboard
process.on ('SIGINT', () => {
  client.quit ();
  console.log ('redis client quit');
});

module.exports = client;
