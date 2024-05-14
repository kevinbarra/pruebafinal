import React from "react";
import { Link } from "react-router-dom";

interface Props {
    to: string
    children: React.ReactNode
    className?: string
}

const ButtonLink = ({ to, children, className }: Props) => {
    return (
        <Link to={to} className={`inline-flex items-center py-2 px-3 md:py-3 md:px-5 rounded hover:bg-black/5 focus:bg-black/5 focus:outline-none ${className}`}>
            {children}
        </Link>
    );
}

export default ButtonLink;