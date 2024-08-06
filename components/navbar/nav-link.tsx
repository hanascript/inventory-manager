import Link from 'next/link';

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
