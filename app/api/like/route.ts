
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';
import {currentUserProfile} from "@/lib/user-pro"; // Clerk for authentication

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { postId, like } = await req.json();

  const user = await currentUserProfile(false);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (like) {
      // If liking a post, add a record in the Like table
      await prisma.like.create({
        data: {
          userId: user.id,
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
          userId: user.id,
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling like/unlike:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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