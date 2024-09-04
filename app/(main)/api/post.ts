import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        quiz: true,
        user: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

/*assuming we have models called post:model Post {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  quizId    String
  quiz      Quiz     @relation(fields: [quizId], references: [id])
  userId    String
  user      User     @relation(fields: [userId], references: [id])
}*/