import GradientBackground from "@/components/GradientBackground";

const ErrorState = ({ error }: { error: string }) => (
  <GradientBackground intensity={20} brightness={95}>
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center max-w-md p-6 bg-destructive/10 rounded-sm border border-destructive">
        <h2 className="text-xl font-semibold text-destructive mb-2">Something went wrong</h2>
        <p className="text-destructive/80">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-destructive text-destructive-foreground rounded-sm hover:bg-destructive/90 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  </GradientBackground>
);

export default ErrorState;
