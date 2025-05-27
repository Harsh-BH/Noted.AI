import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OAuthErrorProps {
  provider: string;
  errorCode?: string;
  errorMessage?: string;
  showContactLink?: boolean;
}

export function OAuthErrorHandler({ 
  provider, 
  errorCode, 
  errorMessage,
  showContactLink = true 
}: OAuthErrorProps) {
  const isGoogleVerificationError = errorCode === "access_denied";
  
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Authentication Failed</AlertTitle>
      <AlertDescription className="space-y-4">
        {isGoogleVerificationError ? (
          <div className="text-sm space-y-2">
            <p className="font-medium">
              {provider} has not completed the verification process.
            </p>
            <p>
              The app is currently being tested, and can only be accessed by developer-approved testers. 
              {showContactLink && " If you think you should have access, contact the developer."}
            </p>
            {errorCode && (
              <p className="text-xs opacity-80">
                Error {errorCode}
                {errorMessage && `: ${errorMessage}`}
              </p>
            )}
            <div className="pt-2">
              <Button variant="outline" size="sm" asChild className="text-xs">
                <Link href="/dashboard/settings/integrations">
                  Go to Integrations Settings
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <p>
            {errorMessage || `We couldn't authenticate with ${provider}. Please try again later.`}
            {errorCode && <span className="block text-xs mt-1">Error code: {errorCode}</span>}
          </p>
        )}
      </AlertDescription>
    </Alert>
  );
}
