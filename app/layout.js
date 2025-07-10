import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from './navbar/page'; // if you have one

export const metadata = {
  title: 'Habit Tracker',
  description: 'Track your daily and weekly habits.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-100">
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
