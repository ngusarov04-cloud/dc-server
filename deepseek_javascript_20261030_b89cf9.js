const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

let calls = [];
let messages = [];
let kusp = [];

app.post('/api/calls', (req, res) => {
  const call = { id: Date.now().toString(), ...req.body, status: 'pending' };
  calls.push(call);
  res.json(call);
});

app.get('/api/calls', (req, res) => {
  res.json(calls);
});

app.patch('/api/calls/:id', (req, res) => {
  const call = calls.find(c => c.id === req.params.id);
  if (call) { Object.assign(call, req.body); res.json(call); }
  else res.status(404).send('Not found');
});

app.post('/api/messages', (req, res) => {
  const msg = { id: Date.now().toString(), ...req.body };
  messages.push(msg);
  res.json(msg);
});

app.get('/api/messages/:chatId', (req, res) => {
  res.json(messages.filter(m => m.chat_id === req.params.chatId));
});

app.post('/api/kusp', (req, res) => {
  const item = { id: Date.now().toString(), ...req.body, date: new Date().toISOString().split('T')[0], status: 'в работе' };
  kusp.push(item);
  res.json(item);
});

app.get('/api/kusp', (req, res) => {
  res.json(kusp);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));