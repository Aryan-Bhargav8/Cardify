import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server'; 

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get  user's ID
    const { userId } = getAuth(req);

    
    const posts = await prisma.post.findMany({
      include: {
        quiz: true,
        user: true,
      },
    });

    if (userId) {
      
      const userLikes = await prisma.like.findMany({
        where: { userId },
        select: { postId: true },
      });

      // Get an array of liked post IDs
      const likedPostIds = userLikes.map((like: { postId: any; }) => like.postId);

      // Return posts with liked status for the current user
      res.status(200).json({
        posts,
        likedPostIds,
      });
    } else {
      // If no user is logged in, just return the posts
      res.status(200).json({
        posts,
        likedPostIds: [], // No likes if not logged in
      });
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
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
  likes     Int      @default(0)
  
}*/
