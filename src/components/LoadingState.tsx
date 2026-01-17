import GradientBackground from "@/components/GradientBackground";

const LoadingState = () => (
  <GradientBackground intensity={30} brightness={95}>
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading checklist...</p>
      </div>
    </div>
  </GradientBackground>
);

export default LoadingState;
