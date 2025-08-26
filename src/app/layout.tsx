import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Tekscan PDF Analyzer',
  description: 'Analyze PDF documents with AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      {/*Fonts*/}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />

      {/*Favicon*/}
      <link rel="icon" type="image/x-icon" href="https://www.neontek.co.ke/images/neon-lamp.png" />

      {/*Title & SEO*/}
      <title>Tekscan PDF Analyzer - Smart Document Analysis</title>
      <meta name="description" content="Upload and analyze PDF documents instantly with Tekscan PDF Analyzer. Extract insights, search text, and understand your files in seconds."/>
      <meta name="keywords" content="Tekscan PDF Analyzer, PDF analyser, PDF analysis tool, document analyzer, extract PDF text, PDF reader, Neontek"/>
      <meta name="author" content="NeonTek"/>

      {/*Open Graph / Facebook*/}
      <meta property="og:title" content="Tekscan PDF Analyzer - Smart Document Analysis"/>
      <meta property="og:description" content="Analyze PDFs with ease. Extract insights, search content, and process your documents quickly with Tekscan PDF Analyzer."/>
      <meta property="og:image" content="https://www.neontek.co.ke/images/neon-lamp.png"/>
      <meta property="og:url" content="https://pdf.neontek.co.ke/"/>
      <meta property="og:type" content="website"/>

      {/*Twitter*/}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content="Tekscan PDF Analyzer - Smart Document Analysis"/>
      <meta name="twitter:description" content="Quickly upload, search, and analyze PDF files with Tekscan PDF Analyzer. Fast, simple, and accurate."/>
      <meta name="twitter:image" content="https://www.neontek.co.ke/images/neon-lamp.png"/>
    </head>
    <body className="font-body antialiased">
      {children}
      <Toaster />
    </body>
  </html>

  );
}
