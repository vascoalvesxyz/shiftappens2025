import Head from 'next/head';

import '@/style/globals.css';

export default function RootLayout({ children }) {
    return (
        <html>
            <Head>
                <link 
                    rel="preconnect" 
                    href="https://fonts.googleapis.com" 
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" 
                    rel="stylesheet"
                />
            </Head>
            <body>
                {children}
            </body>
        </html>
    );
}
