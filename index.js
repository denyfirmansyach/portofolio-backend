const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Data dummy
const projects = require('./data/projects');
const blogs = require('./data/blogs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simpan pesan dari contact di sini (sementara, tidak tersimpan ke DB)
let messages = [];

// Root endpoint
app.get('/', (req, res) => {
  res.send('✅ Backend portfolio API berjalan.');
});

// GET semua proyek
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// GET semua blog
app.get('/api/blog', (req, res) => {
  res.json(blogs);
});

// GET detail blog berdasarkan ID
app.get('/api/blog/:id', (req, res) => {
  const blog = blogs.find(b => b.id === parseInt(req.params.id));
  if (!blog) {
    return res.status(404).json({ error: '❌ Blog tidak ditemukan' });
  }
  res.json(blog);
});

// POST pesan kontak
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log("📥 Diterima:", req.body);

  if (!name || !email || !message) {
    return res.status(400).json({ error: '❌ Semua field wajib diisi.' });
  }

  messages.push({ name, email, message, date: new Date() });
  res.json({ success: true, message: '✅ Pesan berhasil dikirim' });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server backend berjalan di http://localhost:${PORT}`);
});
