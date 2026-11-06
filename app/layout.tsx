import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { MotionProvider } from '@/components/motion-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'AURA | Bold Ideas. Lasting Brands.',
  description: 'AURA is an independent creative studio for branding, campaigns, motion design and digital experiences. Bold ideas. Lasting brands.',
  icons: { icon: '/assets/favicon.svg' },
};

export const viewport: Viewport = { themeColor: '#0b1414' };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
