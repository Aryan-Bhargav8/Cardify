import React from 'react';
import { IconHome, IconCurrencyDollar, IconMessageCircle, IconMail, IconVideo, IconFileText, IconBook, IconClipboard } from '@tabler/icons-react';//   IconDollarSign,
import {FloatingDock} from "@/components/ui/floating-dock";

const NavBar = () => {

    const links = [
        {
          title: "Home",
          icon: (
            <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/",
        },
        {
          title: "Pricing",
          icon: (
            <IconCurrencyDollar className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/payment",
        },
        // {
        //   title: "Chat",
        //   icon: (
        //     <IconMessageCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        //   ),
        //   href: "#",
        // },
        {
          title: "Contact",
          icon: (
            <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/contact",
        },
        // {
        //   title: "Video",
        //   icon: (
        //     <IconVideo className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        //   ),
        //   href: "#",
        // },
        // {
        //   title: "Document",
        //   icon: (
        //     <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        //   ),
        //   href: "#",
        // },
        {
          title: "Flashcards",
          icon: (
            <IconBook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#",
        },
        {
          title: "Quizzes", // New entry for quizzes
          icon: (
            <IconClipboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/quizzes", 
        },
      ];

  return (
    <div className="flex items-center justify-center w-full">
      <FloatingDock
        mobileClassName=""
        items={links}
      />
    </div>
  );
};

export default NavBar;