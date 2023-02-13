import Head from 'next/head';
import type { FC, ReactNode } from 'react';

export interface LayoutProps {
    children?: ReactNode;
    title: string;
}

const Layout: FC<LayoutProps> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            {children}
        </>
    );
};

export default Layout;
