import { NavLink as RouterNavLink } from 'react-router-dom';

function NavLink({to, children, className}: {to: string, children: React.ReactNode, className?: string}) {
    return(
        <RouterNavLink
            to={to}
            className={({isActive}) => `
                ${isActive
                    ? "text-flame border-b-flame"
                    : "text-floral-white hover:border-b-floral-white border-b-transparent"
                }
                border-b-2
                transition-colors duration-200
                ${className}
                `}
            >
                {children}
        </RouterNavLink>
    );
}

export default NavLink;