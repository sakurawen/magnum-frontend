import AutoLoginEffect from '@/app/AutoLoginEffect';
import '@magnum/ui/style.css';
import localFont from 'next/font/local';
import './globals.css';
import Toaster from './Toaster';

const harmonySans = localFont({
  src: [
    {
      path: '../public/harmonySans/HarmonyOS_Sans_SC_Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/harmonySans/HarmonyOS_Sans_SC_Bold.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/harmonySans/HarmonyOS_Sans_SC_Bold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/harmonySans/HarmonyOS_Sans_SC_Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});

/**
 * 根布局
 * @param param0
 * @returns
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={harmonySans.className}>
        <Toaster />
        <AutoLoginEffect />
        {children}
      </body>
    </html>
  );
}
