import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

interface VideoMetadata {
  duration: number;
}

function getVideoMetadata(videoPath: string): Promise<VideoMetadata> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ duration: metadata.format.duration || 0 });
    });
  });
}

export async function generateRandomThumbnail(videoPath: string, outputPath: string): Promise<string> {
  try {
    const { duration } = await getVideoMetadata(videoPath);
    const randomTime = Math.random() * duration;

    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .screenshots({
          timestamps: [randomTime],
          filename: 'thumbnail.png',
          folder: outputPath,
          size: '320x240'
        })
        .on('end', () => {
          resolve(path.join(outputPath, 'thumbnail.png'));
        })
        .on('error', (err: Error) => {
          reject(err);
        });
    });
  } catch (error) {
    throw new Error(`Error generating random thumbnail: ${error}`);
  }
}