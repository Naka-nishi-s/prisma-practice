import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const app = express();
const port = 3001;

app.use(express.json());
const prisma = new PrismaClient();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello~\n');
})

app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
})

app.listen(port, () => {
  console.log(`Server is Running: port ${port}`)
})
