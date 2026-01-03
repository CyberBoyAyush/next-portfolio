import BlogNavbar from "@/components/blog-navbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide main navbar (desktop header + mobile bottom nav), show blog-specific minimal navbar */}
      <style>{`
        /* Hide desktop header */
        body > header,
        body > div > header {
          display: none !important;
        }
        /* Hide mobile bottom navigation from main navbar */
        #main-mobile-nav {
          display: none !important;
        }
      `}</style>
      <BlogNavbar />
      {children}
    </>
  );
}
