import { useRouter } from 'next/router';
import Link from 'next/link';

const Breadcrumb = () => {
    const router = useRouter();
    const path = router.asPath.split('/').filter(Boolean);
    const links = path.map((part, index) => {
        const href = '/' + path.slice(0, index + 1).join('/');
        const label = part.replace(/-/g, ' ').toUpperCase();
        return { label, href };
    });

    const homeLink = { label: 'Home', href: '/' };

    const isProfilePage = router.pathname.includes('/profile');

    return (
        <nav className="text-sm mb-4">
            <ul className="flex space-x-2">
                <li>
                    <Link href={homeLink.href} className={`hover:text-[#F4811F] ${isProfilePage ? 'text-[#0E3B61]' : 'text-white'}`}>
                        {homeLink.label}
                    </Link>
                </li>
                {links.map((link, index) => (
                    <li key={index} className="flex items-center">
                        <span className="mx-2">/</span>
                        <Link 
                            href={link.href} 
                            className={`hover:text-[#F4811F] ${isProfilePage ? 'text-[#0E3B61]' : 'text-white'}`}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumb;
