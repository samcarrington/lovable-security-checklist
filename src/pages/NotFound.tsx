import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PageTitle, Lead } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/link";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log 404 errors in development only
    if (import.meta.env.DEV) {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background transition-colors">
      <div className="text-center">
        <PageTitle className="text-4xl mb-4">404</PageTitle>
        <Lead className="text-xl mb-4">Oops! Page not found</Lead>
        <TextLink href="/" className="underline">
          Return to Home
        </TextLink>
      </div>
    </div>
  );
};

export default NotFound;
