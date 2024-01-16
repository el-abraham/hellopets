import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import HelloPetsLogo from '../images/hellopets RBD.png';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Button } from '@/Components/ui/button';


export default function Layout({ children }: PropsWithChildren) {

  return (
    // <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="relative first-line:sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center dark:bg-dots-lighter dark:bg-gray-900   pt-5">
      <div className='sm:px-5 lg:px-20 2xl:container pb-5'>
        <nav className='container-fluid w-full flex justify-between items-center'>
          <div>
            <img className='w-40' src={HelloPetsLogo} alt="logo-hellopets" />
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">My</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Chat
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className='bg-primary/10' />
                <DropdownMenuItem>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </nav>

      </div>
      <main>{children}</main>

    </div >
  );
}
