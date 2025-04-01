// app/not-found.js (server component)
import NotFoundClient from "@/components/notfoundclient";
export const metadata = {
  title: '404 - Page Not Found | Lawgical',
  description: 'The legal document or page you are looking for cannot be found. Our legal experts at Lawgical are ready to assist you.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: '404 - Page Not Found | Lawgical',
    description: 'The legal document or page you are looking for cannot be found. Our legal experts at Lawgical are ready to assist you.',
    images: [{ url: '/images/lawgical-404.svg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 - Page Not Found | Lawgical',
    description: 'The legal document or page you are looking for cannot be found. Our legal experts at Lawgical are ready to assist you.',
    images: [{ url: '/images/lawgical-404.svg' }],
  }
};

export default function NotFound() {
  return <NotFoundClient />;
}