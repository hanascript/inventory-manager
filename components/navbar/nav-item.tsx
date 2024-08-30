import Link from 'next/link';

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

type Props = {
  href: string;
  text: string;
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
