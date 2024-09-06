import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import {currentUserProfile} from "@/lib/user-pro";
import {db} from "@/lib/db";
import {v4 as uuid} from "uuid";
import {extractTextFromPDF} from "@/lib/pdf-utils";

export async function POST(req: Request, {}) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob | null;
    const chunkNumber = formData.get('chunk');
    const totalChunks = formData.get('chunks');
    const profile = await currentUserProfile();
    const id = formData.get('id');
    const title = formData.get('title');

    console.log(chunkNumber , " " , totalChunks);
    if (!file || !chunkNumber || !totalChunks || !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (parseInt(chunkNumber as string) != 0 && !id){
      return NextResponse.json(
        { error: 'Every chuck after the first one requires an ID'},
        { status: 400 }
      );
    }

    if (!profile) {
      return new NextResponse("Unauthorized" , {status: 401});
    }

    const uploadDir = join(process.cwd(), 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const fID = (id as string) ?? (uuid() + "-" + profile.id + ".pdf");

    const filePath = join(uploadDir, fID);
    const buffer = Buffer.from(await file.arrayBuffer());

    const fileHandle = await writeFile(filePath, buffer, {
      flag: parseInt(chunkNumber as string) === 0 ? 'w' : 'a'
    });

    if (parseInt(chunkNumber as string) == 0) {
      await db.file.create({
        data: {
          userId: profile.id,
          state: "UPLOADING",
          path: join('uploads', fID),
          title: title as string,
          // thumbnail: "",
        }
      })
    }

    if (parseInt(chunkNumber as string) === parseInt(totalChunks as string) - 1) {
      // This is the last chunk, file upload is complete
      try {

        const fContent = await extractTextFromPDF(filePath);

        const file = await db.file.update({
          where: {
            path: join(uploadDir, fID),
          },
          data: {
            state: "COMPLETE",
            // thumbnail: imgPath,
          }
        });
        await db.fileContent.create({
          data: {
            fileId: file.id,
            content: fContent,
          }
        });
      } catch (e) {
        console.log(e);
        return NextResponse.json(
          { error: 'Failed to finalize file' },
          { status: 500 }
        );
      }

      return NextResponse.json({ message: 'File uploaded successfully'});
    } else {
      return NextResponse.json({ message: 'Chunk received' , id: fID});
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}