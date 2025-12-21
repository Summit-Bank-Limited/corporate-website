"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ArrowRight } from "lucide-react";
import Framer from "../Framer";
import { fadeInLetters } from "@/lib/animation";

export function MainHeader({ menu }: { menu: Record<string, any> }) {
  return (
    <NavigationMenu className="hidden xl:block">
      <NavigationMenuList>
        {menu?.map((item: any, index: number) => (
          <Framer animation={fadeInLetters(index)} key={index}>
            <div key={index}>
              {item?.subLinks ? (
                <Framer animation={fadeInLetters(index)} key={index}>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{item?.text}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4  w-full lg:w-[800px] max-w-[900px] lg:grid-cols-[.75fr_1fr]">
                        {item?.subLinks?.map((column: any, colIndex: number) => (
                          <li key={colIndex}>
                            <p className="text-[15px] font-semibold mb-2">{column.text}</p>
                            <ul className="grid gap-1">
                              {column?.links?.map((linkItem: any, linkIndex: number) => {
                                const isExternal = linkItem?.link?.startsWith('http://') || linkItem?.link?.startsWith('https://');
                                return (
                                  <li key={linkIndex} className="mb-2">
                                    <NavigationMenuLink asChild>
                                      {isExternal ? (
                                        <a
                                          href={linkItem?.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex flex-col p-2 rounded-md hover:bg-gray-100 transition-colors"
                                        >
                                          <span className="text-base font-medium">
                                            {linkItem.name}
                                          </span>
                                          {linkItem.description && (
                                            <span className="text-xs text-gray-500 mt-1 font-normal">
                                              {linkItem.description}
                                            </span>
                                          )}
                                        </a>
                                      ) : (
                                        <Link
                                          href={linkItem?.link}
                                          className="flex flex-col p-2 rounded-md hover:bg-gray-100 transition-colors"
                                        >
                                          <span className="text-base font-medium">
                                            {linkItem.name}
                                          </span>
                                          {linkItem.description && (
                                            <span className="text-xs text-gray-500 mt-1 font-normal">
                                              {linkItem.description}
                                            </span>
                                          )}
                                        </Link>
                                      )}
                                    </NavigationMenuLink>
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </Framer>
              ) : (
                <NavigationMenuItem>
                  <Link href={item?.link} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item?.text}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </div>
          </Framer>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
