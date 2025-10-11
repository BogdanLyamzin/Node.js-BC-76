import express from 'express';
import cors from 'cors';
import PinoHttp from 'pino-http';
import 'dotenv/config';

import movies from './db/movies.js';

const app = express(); // app - web-server

const logger = PinoHttp({
  transport: {
    target: 'pino-pretty',
  },
});

app.use(cors());
// app.use(logger);
app.use(express.json());

// const corsMiddleware = cors();
// app.use(corsMiddleware);

// const cors = options => {
//     return (req, res, next)=> {
//         // options
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.setHeader(
//           'Access-Control-Allow-Methods',
//           'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//         );
//         res.setHeader(
//           'Access-Control-Allow-Headers',
//           'X-Requested-With,content-type',
//         );
//         res.setHeader('Access-Control-Allow-Credentials', true);
//         next();
//     }
// }

// app.get("/", (request, response)=> {
//     response.send("<h1>Home page</h1>");
// });

// app.get("/contacts", (request, response)=> {
//     console.log(request.url);
//     console.log(request.method);
//     response.send("<h1>Contacts page</h1>");
// });

// app.set("json spaces", 8);

// app.use((req, res, next)=> {
//     console.log("First middleware");
//     next();
// });

// app.use((req, res, next)=> {
//     console.log("Second middleware");
//     next();
// });

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type',
//   );
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.get('/products', (req, res) => {
  res.json([]);
});

app.get('/movies', (req, res) => {
  // const databaseResponse = null;
  // res.json(databaseResponse);
  // res.send(databaseResponse);
  res.json(movies);
  // res.send(movies);
});

app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const result = movies.find((item) => item.id === id);
  if (!result) {
    return res.status(404).json({
      message: `Movie with id=${id} not found`,
    });
  }

  res.json(result);
});

app.get('/users', async (req, res) => {
  throw new Error('Cannot find users');
});

app.use((req, res) => {
  res.status(404).json({
    message: `${req.method} ${req.url} not found`,
  });
});

app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
  });
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Server running 3000 port`));
