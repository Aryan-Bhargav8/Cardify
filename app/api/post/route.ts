import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';
import {currentUserProfile} from "@/lib/user-pro";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Get user's ID
    const user = await currentUserProfile(false);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch posts along with quiz and user data
    const posts = await prisma.post.findMany({
      include: {
        quiz: true,
        user: true,
      },
    });

    if (user.id) {
      // Fetch the posts liked by the user
      const userLikes = await prisma.like.findMany({
        where: {
          userId: user.id,
        },
        select: { postId: true },
      });

      // Get an array of liked post IDs
      const likedPostIds = userLikes.map((like: { postId: any }) => like.postId);

      // Return posts with liked status for the current user
      return NextResponse.json({
        posts,
        likedPostIds,
      });
    } else {
      // If no user is logged in, return posts without likes
      return NextResponse.json({
        posts,
        likedPostIds: [],
      });
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
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
