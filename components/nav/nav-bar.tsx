import React from 'react';
import {
  IconBook,
  IconCurrencyDollar,
  IconFileText,
  IconHome,
  IconMail,
  IconMessageCircle,
  IconVideo
} from "@tabler/icons-react";
import {FloatingDock} from "@/components/ui/floating-dock";

const NavBar = () => {

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Pricing",
      icon: (
        <IconCurrencyDollar className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Chat",
      icon: (
        <IconMessageCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Contact",
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Video",
      icon: (
        <IconVideo className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Document",
      icon: (
        <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Flashcards",
      icon: (
        <IconBook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
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