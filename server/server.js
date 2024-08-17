const express = require('express');
const app = express();
const port = 5000;

// app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));


app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
// });
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
