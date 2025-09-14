import { Button } from "@/components/ui/button";
import { symptomQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

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
    <div>
      <h1 className="text-2xl pb-4 uppercase">{symptom.name}</h1>
      <p className="text">{symptom.description}</p>
      <div className="w-full max-w-xl p-6 rounded-lg border bg-card p-6 mt-5 text-card-foreground bg-secondary">
        <h2>Please select the severity of your symptoms:</h2>
        <div className="flex gap-4 mt-5 justify-center">
          <Button variant="outline" className="m-1" size="xl" key={symptom.id} asChild>
            <Link to="/symptoms/$symptomId" params={{ symptomId: symptom.id }}>
              Mild
            </Link>
          </Button>
          <Button variant="outline" className="m-1" size="xl" key={symptom.id} asChild>
            <Link to="/symptoms/$symptomId" params={{ symptomId: symptom.id }}>
              Moderate
            </Link>
          </Button>
          <Button variant="outline" className="m-1" size="xl" key={symptom.id} asChild>
            <Link to="/symptoms/$symptomId" params={{ symptomId: symptom.id }}>
              Severe
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
