
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Music,
  Home,
  Compass,
  Sparkles,
  Users,
  LogIn,
  UserPlus,
  Album,
  Lock,
} from "lucide-react";
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/browse", label: "Browse", icon: Compass },
  { href: "/albums", label: "Albums", icon: Album, disabled: true, lockIcon: Lock },
  { href: "/generate", label: "Generate Playlist", icon: Sparkles },
  { href: "/feed", label: "Feed", icon: Users },
];

export default function MainSidebar() {
  const pathname = usePathname();

  const isLoggedIn = !['/login', '/signup', '/'].includes(pathname);

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Music className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline">EarBeatz</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        {isLoggedIn ? (
          <SidebarMenu>
            {NAV_ITEMS.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.disabled ? `${item.label} (Coming Soon)`: item.label}
                  disabled={item.disabled}
                  className={item.disabled ? "cursor-not-allowed opacity-50" : ""}
                >
                  <Link href={item.disabled ? "#" : item.href} tabIndex={item.disabled ? -1 : undefined}>
                    {item.disabled && item.lockIcon ? <item.lockIcon /> : <item.icon />}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        ) : (
           <div className="flex-grow">
           </div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-2">
         {!isLoggedIn && (
           <>
            <SidebarSeparator />
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/login"} tooltip="Login">
                    <Link href="/login">
                      <LogIn />
                      <span>Login</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/signup"} tooltip="Sign Up">
                    <Link href="/signup">
                      <UserPlus />
                      <span>Sign Up</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
           </>
         )}
      </SidebarFooter>
    </>
  );
}
