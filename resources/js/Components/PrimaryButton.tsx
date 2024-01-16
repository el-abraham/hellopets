import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-primary-theme border border-transparent rounded-md font-semibold text-xs text-white  uppercase tracking-widest hover:bg-primary-theme/80 focus:bg-primary-theme/80  active:bg-primary-theme/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  transition ease-in-out duration-150 ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
