// Version stable qui marchait
const express = require('express');
const app = express();
app.use(express.json({ limit: '10mb' }));

console.log('🔥 Service Stable restauré !');

app.post('/execute-swap', async (req, res) => {
  // Code stable qui marchait...
});
