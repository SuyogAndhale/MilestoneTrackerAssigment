import { useMilestones } from "../hooks/useMilestones";
import MilestoneForm from "../components/MilestoneForm";
import MilestoneList from "../components/MilestoneList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Dashboard() {
  const { milestones, loading, error, addMilestone } = useMilestones();

  return (
    <div className="min-h-screen bg-minimal text-gray-100 py-8 sm:py-12 container-padding">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Personal Milestone Tracker</h1>
          </div>
        </header>

        <ErrorMessage message={error} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="md:sticky md:top-6"> 
              <MilestoneForm onSubmit={addMilestone} loading={loading} />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="relative">
              {loading && milestones.length > 0 && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 rounded-lg p-4 sm:p-6">
                  <Loader size="medium" message="Updating…" />
                </div>
              )}

              {loading && milestones.length === 0 ? (
                <Loader overlay={true} size="large" message="Loading milestones…" />
              ) : (
                <MilestoneList milestones={milestones} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
