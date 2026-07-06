import type { Metadata } from 'next';
import { Orbitron, Rajdhani } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
import './globals.css';

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900']
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700']
});

const siteUrl = 'https://pagani-car-website.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Pagani Huayra BC | Macchina Volante — Luxury Hypercar Showcase',
    template: '%s | Pagani Huayra BC',
  },
  description: 'Experience the Pagani Huayra BC Macchina Volante through an ultra-premium, cinematic scroll-driven digital showcase. Explore the 745 HP twin-turbo V12 engine, active aerodynamics, and carbon fiber craftsmanship in stunning detail.',
  keywords: [
    'Pagani Huayra BC', 'Macchina Volante', 'hypercar', 'supercar',
    'Pagani', 'V12 engine', 'twin turbo', 'luxury car', 'sports car',
    'carbon fiber', 'Italian hypercar', 'AMG M158', 'aerodynamics',
    'car showcase', 'automotive design', 'Horacio Pagani', 'Modena Italy',
  ],
  authors: [{ name: 'Shantanu Shinde' }],
  creator: 'Shantanu Shinde',
  publisher: 'Shantanu Shinde',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Pagani Huayra BC | Macchina Volante',
    title: 'Pagani Huayra BC — Cinematic Hypercar Experience',
    description: 'An Awwwards-style, scroll-driven digital experience showcasing the Pagani Huayra BC. 745 HP V12, active aerodynamics, and anti-gravity engineering exhibitions.',
    images: [
      {
        url: '/images/huayra-sequence/frame_000000.webp',
        width: 1920,
        height: 1080,
        alt: 'Pagani Huayra BC Macchina Volante — White hypercar with red and blue racing livery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pagani Huayra BC — Cinematic Hypercar Experience',
    description: 'An ultra-premium scroll-driven showcase of the Pagani Huayra BC. 745 HP V12, active aerodynamics, exploded engineering exhibitions.',
    images: ['/images/huayra-sequence/frame_000000.webp'],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'automotive',
};

// JSON-LD Structured Data for Google Rich Results
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Pagani Huayra BC | Macchina Volante — Luxury Hypercar Showcase',
  description: 'Experience the Pagani Huayra BC Macchina Volante through an ultra-premium, cinematic scroll-driven digital showcase featuring a 745 HP twin-turbo V12 engine, active aerodynamics, and carbon fiber craftsmanship.',
  url: siteUrl,
  author: {
    '@type': 'Person',
    name: 'Shantanu Shinde',
  },
  about: {
    '@type': 'Car',
    name: 'Pagani Huayra BC Macchina Volante',
    manufacturer: {
      '@type': 'Organization',
      name: 'Pagani Automobili',
      url: 'https://www.pagani.com',
    },
    vehicleEngine: {
      '@type': 'EngineSpecification',
      name: 'Mercedes-AMG M158 6.0L Twin-Turbocharged V12',
      engineDisplacement: {
        '@type': 'QuantitativeValue',
        value: '6.0',
        unitCode: 'LTR',
      },
      enginePower: {
        '@type': 'QuantitativeValue',
        value: '745',
        unitCode: 'BHP',
      },
      torque: {
        '@type': 'QuantitativeValue',
        value: '1000',
        unitCode: 'NM',
      },
    },
    speed: {
      '@type': 'QuantitativeValue',
      value: '370',
      unitCode: 'KMH',
    },
    bodyType: 'Coupe',
    numberOfDoors: 2,
    driveWheelConfiguration: 'RearWheelDriveConfiguration',
    fuelType: 'Gasoline',
    productionDate: '2017',
    countryOfOrigin: {
      '@type': 'Country',
      name: 'Italy',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${orbitron.variable} ${rajdhani.variable} antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
