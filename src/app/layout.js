import "./globals.css";

export const metadata = {
  title: "Teklyn Solutions — Designing, Building & Scaling Digital Products",
  description: "Teklyn Solutions combines product strategy, engineering, and execution to help startups and enterprises transform ideas into scalable, high-performance software.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&family=Google+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
