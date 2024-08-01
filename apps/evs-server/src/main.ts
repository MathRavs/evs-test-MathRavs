import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import { TodoModel } from './models/todo.model';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const items: TodoModel[] = [];

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = req.body as TodoModel;
  newItem.id = uuidv4();

  // Todo validate the newItem entry
  // use zod to validate the schema
  items.push(newItem);
  res.status(201).json(newItem);
});


app.listen(port, host, () => {
  /* eslint-disable no-console */
  /* I need this console.log statement because it displays the server running status */
  console.log(`[ ready ] http://${host}:${port}`);
});
