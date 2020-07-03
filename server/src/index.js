const express = require('express');

const app = express();

const server = process.env.SERVER || 'https://localhost';
const port = process.env.PORT || 1337;

app.listen(server, port, () => {
   console.log(`Listening at ${SERVER}:${PORT}`);
});