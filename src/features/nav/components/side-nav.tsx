import { buttonVariants } from "@/components/ui/shadcn/button"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { ReactElement } from "react"
import { IconType } from "react-icons/lib"

  interface SideNavProps {
    links: {
      title: string
      label?: string
      icon: ReactElement<IconType>
      variant: "default" | "ghost"
    }[]
  }

export default function SideNav({ links }: SideNavProps): JSX.Element | undefined {

    return (
      <div className="group flex flex-col group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <nav>
          { links.map((link, index) => 
          <Link 
            key={index}
            className={cn(
              buttonVariants({ variant: link.variant, size: "sm" }),
              link.variant === "default" &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start"
            )}
          >
          {link.title}
          </Link>
          )}
        </nav>
      </div>
    );
  }