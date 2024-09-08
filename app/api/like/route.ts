
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server'; // Clerk for authentication

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId, like } = req.body;

  const { userId } = getAuth(req); //  get  user's ID
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (like) {
      // If liking a post, add a record in the Like table
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });

      // Increment like count in the Post table
      await prisma.post.update({
        where: { id: postId },
        data: {
          likes: { increment: 1 },
        },
      });
    } else {
      // If unliking, remove the record from the Like table
      await prisma.like.deleteMany({
        where: {
          userId,
          postId,
        },
      });

      // Decrement like count in the Post table
      await prisma.post.update({
        where: { id: postId },
        data: {
          likes: { decrement: 1 },
        },
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error handling like/unlike:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
/*model for like 
model Like {
  id      String   @id @default(auto()) @map("_id") @db.ObjectId
  user    User     @relation(fields: [userId], references: [id])
  userId  String   @db.ObjectId
  post    Post     @relation(fields: [postId], references: [id])
  postId  String   @db.ObjectId
  createdAt DateTime @default(now())
}
*/