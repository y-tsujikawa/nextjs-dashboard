import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'The Customers page of the official Next.js Learn Dashboard built with App Router.',
  robots: 'noindex, follow',
};

export default function Page() {
  return <p>Customers Page</p>;
}
