
import React from "react";
import Dashboard from "@/app/(main)/app/page-inner";
import {db} from "@/lib/db";
import {currentUserProfile} from "@/lib/user-pro";

const Page = async () => {

  const user = await currentUserProfile(true);
  if (!user) return;

  const files = await db.file.findMany({
    where: {
      userId: user.id,
    }
  })

  return <Dashboard/>;
}

export default Page;