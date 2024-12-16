import express from 'express';
import { client } from './models/index.js';
// A package to help pull cookies from the client/browser request obj
import cookieParser from 'cookie-parser';
import routes from './routes/api/index.js';
const app = express();
const PORT = process.env.PORT || 3333;
/* MiddleWare - Some additional functionality to our routes or opening/closing layers of access */
// Allow json to be sent from the client/browser to our routes through req.body
app.use(express.json());
// Allow us to use req.cookies in our routes to get the client/browser jwt token
app.use(cookieParser());
// Load all of our routes
app.use('/', routes);
// Sync all of our models to create the database tables (Users, Shops and Wines)
await client.sync({ force: false });
app.listen(PORT, () => console.log('Express server started'));
