import * as React from "react";
import { Link } from "react-router-dom";
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

export default function Navbar() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center p-4">
      <NavigationMenu>
        <NavigationMenuList className="sm:flex sm:space-x-4 flex-col sm:flex-row items-center">
          <NavigationMenuItem>
            <Link to={`${import.meta.env.BASE_URL}home`}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <p className="text-lg font-bold">Home</p>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to={`${import.meta.env.BASE_URL}satellites`}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <p className="text-lg font-bold">Satellites</p>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to={`${import.meta.env.BASE_URL}about`}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <p className="text-lg font-bold">About</p>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
    </div>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";