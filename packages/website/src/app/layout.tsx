import './globals.css';
import '@magnum/ui/style.css';

/**
 * 根布局
 * @param param0
 * @returns
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
