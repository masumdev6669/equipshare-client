import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="bg-secondary/10 p-6 rounded-full mb-6">
        <AlertTriangle className="h-16 w-16 text-secondary" />
      </div>
      <h1 className="text-5xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button className="bg-primary rounded-full px-8">Back to Home</Button>
      </Link>
    </div>
  );
}
