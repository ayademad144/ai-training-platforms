import Footer from "@/components/layout/footer";
import SiteHeader from "@/components/layout/site-header";

export default function MarketingLayout({ children }) {
  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-lg"
        href="#main-content"
      >
        Skip to main content
      </a>
      <SiteHeader />
      {children}
      <Footer />
    </>
  );
}
