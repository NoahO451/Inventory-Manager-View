import useUserStore from "@/hooks/useUserStore";

// Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { Link } from "@tanstack/react-router";
import LogoutButton from "@/features/auth/components/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { Button } from "@/components/ui/shadcn/button";

// Icons
import { PiBell } from "react-icons/pi";
import { PiMoon } from "react-icons/pi";
import { PiGear } from "react-icons/pi";
import { PiSignOutFill } from "react-icons/pi";
import { PiUserBold } from "react-icons/pi";

export default function TopNav(): JSX.Element | undefined {
  const userData = useUserStore();
  const avatarFallback = `${userData?.firstName?.substring(0,1)}${userData?.lastName?.substring(0,1)}`;

  return (
    <div className="min-h-full">
      <nav className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-2">
          <div className="flex h-10 items-center justify-between">
            <p className="font-semibold">Dashboard</p>
            <div className="flex justify-evenly items-center gap-2">
              <div>
                <Button variant="ghost" className="rounded-full" size="icon">
                  <PiMoon className="h-6 w-6" />
                </Button>
                <Button variant="ghost" className="rounded-full" size="icon">
                  <PiBell className="h-6 w-6" />
                </Button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="empty" className=" rounded-full" size="icon">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="../../../../public/zagreus01.jpg"
                        alt="@shadcn"
                      />
                      <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[250px]"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userData?.firstName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userData?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <div className="flex gap-1 items-center">
                        <PiUserBold className="w-4 h-4 relative top-[1px]" />
                        <Link to="/manage-account">
                          <p className="text-sm">Profile</p>
                        </Link>
                      </div>
                      {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex gap-1 items-center">
                        <div className="flex gap-1 items-center">
                          <PiGear className="w-4 h-4 relative top-[1px]" />
                          <Link to="/manage-account">
                            <p className="text-sm">Settings</p>
                          </Link>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex gap-1 items-center">
                      <PiSignOutFill className="w-4 h-4 relative top-[1px]" />
                      <LogoutButton />
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}