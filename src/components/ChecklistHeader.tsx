import ProgressDial from "@/components/ProgressDial";

const ChecklistHeader = ({
  title,
  totalProgress,
}: {
  title: string;
  totalProgress: number;
}) => (
  <header className="mb-16">
    {/* Left-aligned asymmetric layout with ProgressDial on the right */}
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
      <div className="flex-1">
        <h1 className="text-fluid-2xl md:text-fluid-3xl font-bold text-foreground font-display leading-tight">
          {title}
        </h1>
      </div>
      <div className="flex-shrink-0">
        <ProgressDial percentage={totalProgress} size="lg" />
      </div>
    </div>

    <div className="max-w-3xl">
      <p className="text-muted-foreground text-fluid-base leading-relaxed mb-4">
        Use this list* to set areas of priority for your work once you're entering
        human-in-the-loop territory and guiding a project toward Production and
        release. If you are coding with LLM support and pairing, ensure you
        educate yourself on risks and limitations. No code should reach
        production without human review and approvals.
      </p>
      <p className="text-muted-foreground text-fluid-xs">
        *The list is not exhaustive and should not be used as the only means of
        security validation.
      </p>
    </div>
  </header>
);

export default ChecklistHeader;
