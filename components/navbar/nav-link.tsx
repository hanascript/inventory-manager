import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';

type Props = {
  href: string;
  text: string;
};

export const NavLink = ({ href, text }: Props) => {
  return (
    <Link
      href={href}
      className='text-foreground transition-colors hover:text-foreground'
    >
      {text}
    </Link>
  );
};

export const NavItem = ({ href, text }: Props) => {
  return (
    <NavigationMenuItem>
      <Link
        href={href}
        legacyBehavior
        passHref
      >
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>{text}</NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};
