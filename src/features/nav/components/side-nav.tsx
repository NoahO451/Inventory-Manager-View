import { buttonVariants } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { cloneElement, Fragment, ReactElement } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { FcDebian } from "react-icons/fc";

interface SideNavProps {
  links: {
    id: number,
    title: string;
    label: string;
    to: string;
    icon: ReactElement;
    variant: "menuItem" | "ghost";
  }[];
}

export default function SideNav({
  links,
}: SideNavProps): JSX.Element | undefined {
  return (
    <div className="flex flex-col w-full gap-6 px-4 py-3 bg-secondary">
      <div className="flex w-full flex-col items-center gap-6">
        <h1 className="text-xl font-semibold text-white">
          <Link className="relative flex items-center" to="/">
            <FcDebian className="h-6 w-6 mr-1" />
            Overstock
          </Link>
        </h1>
        <div className="backdrop-blur">
          <form>
            <div className="relative px-1">
              <PiMagnifyingGlass className="absolute left-2 top-[6px] h-4 w-4" />
              <Input placeholder="Search" className="pl-8 h-7" />
            </div>
          </form>
        </div>
      </div>
      <nav className="flex flex-col w-full gap-2 px-1">
        {links.map((link, index) => (
          <Fragment key={link.id}>
            {index === 0 && <p className="text-xs text-white">General</p>}
            {index === 4 && <p className="text-xs text-white mt-4">Platform</p>}
            <Link
              to={link.to}
              activeProps={{ className: 'text-white bg-activeMenuItem' }}
              className={cn(
                buttonVariants({ variant: link.variant, size: "sm" }),
                link.variant === "menuItem" && "text-light",
                "justify-start"
              )}
            >
              {cloneElement(link.icon, { className: "mr-2 h-4 w-4" })}
              {link.title}
            </Link>
          </Fragment>
        ))}
      </nav>
    </div>
  );
}