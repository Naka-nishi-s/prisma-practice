import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express, { Request, Response } from 'express';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello~\n');
})

// ユーザー取得
app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
})

// ユーザー作成
app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const data = {
    name: name,
    email: email
  }

  try {
    const newUser = await prisma.user.create({
      data: data
    })
    res.json(newUser);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
})

// ユーザー更新
app.put('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const data = {
    name: name,
    email: email
  }

  try {
    const updateUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: data
    })
    res.json(updateUser);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
})

// ユーザー削除
app.delete('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteUser = await prisma.user.delete({
      where: { id: parseInt(id) }
    })
    res.json(deleteUser);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
})

app.listen(port, () => {
  console.log(`Server is Running: port ${port}`)
})
