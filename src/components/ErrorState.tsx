import GradientBackground from "@/components/GradientBackground";

const ErrorState = ({ error }: { error: string }) => (
  <GradientBackground intensity={20} brightness={95}>
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Something went wrong</h2>
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    </div>
  </GradientBackground>
  );

export default ErrorState;