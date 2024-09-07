import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import {currentUserProfile} from "@/lib/user-pro";
import fs from 'fs';
import {db} from "@/lib/db";


export async function GET(req: Request , { params }: { params: { id: string } }) {
  try {

    const id = params.id;
    const profile = await currentUserProfile();

    if (!id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!profile) {
      return new NextResponse("Unauthorized" , {status: 401});
    }

    const file = await db.file.findUnique({
      where: {
        id: id,
        userId: profile.id,
      },
    })

    if (!file) {
      return new NextResponse("Not found" , {status: 404});
    }


    const filePath = join(process.cwd(), file.path);
    const fileContent = fs.readFileSync(filePath);

    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${file.title.endsWith('.pdf') ? file.title + '.pdf' : file.title}`,
      },
    });
  } catch (error) {
    console.error('Load error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}