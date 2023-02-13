import '@/styles/style.css';
import { Rubik } from '@next/font/google';
import type { AppProps } from 'next/app';

const rubik = Rubik({
    subsets: ['latin'],
});

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <style jsx global>
                {`
                    :root {
                        --primary-font: ${rubik.style.fontFamily};
                    }
                `}
            </style>
            <Component {...pageProps} />;
        </>
    );
}
