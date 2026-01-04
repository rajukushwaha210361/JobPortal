
import React from 'react';

const Footer = () => {
    return (
        <footer className="flex flex-col md:flex-row max-w-7xl m-auto bg-white shadow-xl border-t border-gray-200 justify-between items-center p-6">
            {/* Left section */}
            <div className="text-center md:text-left">
                <h1 className="text-xl font-semibold text-gray-800">Job Hunt</h1>
                <p className="text-gray-600 text-sm mt-1">© 2025 Your Company. All rights reserved.</p>
            </div>

            {/* Social icons */}
            <div className="flex space-x-6 mt-4 md:mt-0 ">
                {/* LinkedIn */}
                <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 text-gray-700 flex items-cente space-x-1"
                >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M4.98 3.5C4.98 5.43 3.43 7 1.5 7S-2 5.43-2 3.5 1.43 0 3.5 0s1.48 1.57 1.48 3.5zM.07 8h4.86V24H.07V8zm7.98 0h4.66v2.16h.06c.65-1.23 2.23-2.53 4.58-2.53 4.9 0 5.8 3.23 5.8 7.42V24h-4.86v-6.84c0-1.63-.03-3.72-2.27-3.72-2.27 0-2.62 1.77-2.62 3.6V24h-4.86V8z" />
                    </svg>
                    <span className="hidden md:inline">LinkedIn</span>
                </a>

                {/* Facebook */}
                <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 text-gray-700 flex items-center space-x-1"
                >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35C.592 0 0 .593 0 1.326v21.348C0 23.407.592 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.505 0-1.796.715-1.796 1.763v2.31h3.592l-.467 3.622h-3.125V24h6.127C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
                    </svg>
                    <span className="hidden md:inline">Facebook</span>
                </a>

                {/* Twitter */}
                <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 text-gray-700 flex items-center space-x-1"
                >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 4.557a9.93 9.93 0 01-2.828.775A4.932 4.932 0 0023.337 3.1a9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.15a4.917 4.917 0 001.523 6.574 4.897 4.897 0 01-2.229-.616v.06a4.918 4.918 0 003.946 4.827 4.904 4.904 0 01-2.224.085 4.918 4.918 0 004.6 3.417 9.867 9.867 0 01-6.102 2.104c-.396 0-.79-.023-1.175-.069a13.945 13.945 0 007.548 2.212c9.057 0 14.01-7.514 14.01-14.01 0-.213-.004-.426-.014-.637A10.012 10.012 0 0024 4.557z" />
                    </svg>
                    <span className="hidden md:inline">Twitter</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
