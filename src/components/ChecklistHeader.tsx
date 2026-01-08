import ProgressDial from "@/components/ProgressDial";

const ChecklistHeader = ({
  title,
  totalProgress,
}: {
  title: string;
  totalProgress: number;
}) => (
  <header className="text-center mb-12">
    <h1 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white text-vibe-dark-gray">
      {title}
    </h1>

    <div className="flex justify-center mb-6">
      <ProgressDial percentage={totalProgress} size="lg" className="mb-4" />
    </div>

    <p className="text-vibe-gray max-w-2xl mx-auto">
      Use this list* to set areas of priority for your work once you're entering
      human-in-the-loop territory and guiding a project toward Production and
      release. If you are coding with LLM support and pairing, ensure you
      educate yourself on risks and limitations. No code should reach
      production without human review and approvals.
    </p>
    <p className="text-vibe-gray max-w-2xl mx-auto text-xs pt-4">
      *The list is not exhaustive and should not be used as the only means of
      security validation.
    </p>
  </header>
);

export default ChecklistHeader;