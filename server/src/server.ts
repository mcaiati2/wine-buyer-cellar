import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import routes from './routes/api/index.js';
import client from './config/connection.js'; // Ensure this import is correct

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cookieParser());

app.use('/', routes);

if (process.env.PORT) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  app.use(express.static(path.join(__dirname, '../../client/dist')));
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

client.sync({ force: false })
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Express server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });