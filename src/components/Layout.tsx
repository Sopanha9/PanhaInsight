import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <header>
                <h1>My Blog</h1>
                <nav>
                    <a href="/">Home</a>
                </nav>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;