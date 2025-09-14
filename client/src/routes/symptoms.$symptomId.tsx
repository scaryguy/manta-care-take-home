import { Button } from "@/components/ui/button";
import { symptomQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/symptoms/$symptomId")({
  params: {
    parse: (raw) => ({ symptomId: Number(raw.symptomId) }),
    stringify: (raw) => ({ symptomId: String(raw.symptomId) }),
  },
  component: SymptomDetail,
});

function SymptomDetail() {
  const { symptomId } = Route.useParams();
  const {
    isPending,
    error,
    data: symptom,
  } = useQuery(symptomQueryOptions(symptomId));

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return "There was an error, please refresh your page.";
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl pb-4 uppercase">{symptom.name}</h1>
        <p className="text">{symptom.description}</p>
        <div className="w-full text-center p-6 rounded-lg border bg-card p-6 mt-5 text-card-foreground bg-secondary">
          <h2>
            Please select the severity of your symptoms to see possible
            interventions:
          </h2>
          <div className="flex gap-4 mt-5 justify-center">
            <Button
              variant="outline"
              className="m-1"
              size="xl"
              asChild
            >
              <Link
                to="/symptoms/$symptomId/$severity"
                params={{ symptomId: symptom.id, severity: "mild" }}
              >
                Mild
              </Link>
            </Button>
            <Button
              variant="outline"
              className="m-1"
              size="xl"
              asChild
            >
              <Link
                to="/symptoms/$symptomId/$severity"
                params={{ symptomId: symptom.id, severity: "moderate" }}
              >
                Moderate
              </Link>
            </Button>
            <Button
              variant="outline"
              className="m-1"
              size="xl"
              asChild
            >
              <Link
                to="/symptoms/$symptomId/$severity"
                params={{ symptomId: symptom.id, severity: "severe" }}
              >
                Severe
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
