import { ExternalLink } from "lucide-react";

const Footer = () => (
  <footer className="mt-16 text-center text-sm text-muted-foreground">
    <p>
      Made by Sam Carrington and Lovable using source material from ChatGPT and
      original JSON from{" "}
      <a
        href="https://www.fine.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline inline-flex items-center"
      >
        fine.dev
        <ExternalLink className="h-3 w-3 ml-1" />
      </a>
    </p>
  </footer>
);

export default Footer;