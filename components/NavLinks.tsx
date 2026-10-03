'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/', label: 'Home' },
    { href: '/meetings', label: 'Meetings' },
    { href: '/meetings/current', label: 'This Week' },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="flex gap-4 p-4 border-b border-gray-200">
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={isActive ? 'font-semibold text-blue-600' : 'text-gray-600'}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}