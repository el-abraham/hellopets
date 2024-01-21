import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import HelloPetsLogo from '../images/hellopets RBD.png';
import { FacebookIcon, InstagramIcon } from 'lucide-react';

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
import { AvatarIcon, InstagramLogoIcon } from '@radix-ui/react-icons';


type LayoutType = {
  user: null | User
}

export default function Layout({ children, user }: PropsWithChildren & LayoutType) {

  const LoadAuthenticated = () => {
    if (user) {
      if (user.role == "shop_master") {
        return (
          <>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className='rounded-full px-3'>
                  <AvatarIcon className='w-6 h-6' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <Link href={route('shop.dashboard')}>
                    <DropdownMenuItem>
                      My pet house
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className='bg-primary/10' />
                <Link href={route('logout')} method='post'>
                  <DropdownMenuItem>
                    Log out
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      } else {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className='rounded-full px-3'>
                <AvatarIcon className='w-6 h-6' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <Link href={route('shop.dashboard')}>
                  <DropdownMenuItem>
                    My Order
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className='bg-primary/10' />
              <Link href={route('logout')} method='post'>
                <DropdownMenuItem>
                  Log out
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    } else {
      return (
        <>
          <Link href='register-uh'>
            <Button>Set up Your Pet House</Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className='rounded-full px-3'>
                <AvatarIcon className='w-6 h-6' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <Link href='/register'>
                  <DropdownMenuItem>
                    Sign up
                  </DropdownMenuItem>
                </Link>
                <Link href={'/login'}>
                  <DropdownMenuItem>
                    Log in
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    }
  }

  return (
    // <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="relative first-line:sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center dark:bg-dots-lighter dark:bg-gray-900   pt-5 flex flex-col">
      <div className='sm:px-5 w-full lg:px-20 2xl:container pb-5'>
        <nav className='container-fluid w-full flex justify-between items-center'>
          <div>
            <Link href={route('welcome')}>
              <img className='w-40' src={HelloPetsLogo} alt="logo-hellopets" />
            </Link>
          </div>

          <div className='flex items-center space-x-5'>
            {
              LoadAuthenticated()
            }
          </div>

        </nav>

      </div>

      <hr className='w-full' />
      <main className='flex-1'>{children}</main>

      <footer className='w-full bg-gray-200 '>
        <div className='flex justify-center space-x-5 pt-5 pb-3'>
          <FacebookIcon className='text-black/60' />
          <InstagramIcon className='text-black/60' />

        </div>
        <div className='flex justify-center text-sm py-2 text-black/70'>© 2024 HelloPets</div>
      </footer>
    </div >
  );
}
