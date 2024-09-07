"use client";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useRouter } from "next/navigation";
import CardContent from '@mui/material/CardContent';
import { useRef } from "react";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

export default function UploadForm() {
  const fileInput = useRef<HTMLInputElement>(null);

  const router = useRouter();
  async function uploadFile(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    evt.preventDefault();
    var formdata = new FormData();
    formdata.append("file", fileInput?.current?.files?.[0]!);
    await fetch("/api/upload", { method: "POST", body: formdata });
    router.refresh();
  }

  return (
    <form
      method="POST"
      action="/api/upload"
      className="bg-tertiary font-sans min-h-screen flex items-center justify-center"
    >
      <Card className="w-full max-w-md items-center justify-center">
        <CardContent>
        <Typography variant="h4" > Upload a File</Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}> Select a file from your device to upload.</Typography>
        </CardContent>
        <CardContent className="space-y-4">
        <div className="space-y-2">
      <label>
        File:
      </label>
      <input type="file" name="file" ref={fileInput} />
      </div>
      </CardContent>
      <CardActions>
      <Button  size='small' type="submit" onClick={uploadFile}className="items-center justify-center">
        Submit
      </Button>
      </CardActions>
      </Card>
    </form>
  );
}