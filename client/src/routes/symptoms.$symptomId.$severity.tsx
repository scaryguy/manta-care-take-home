import { interventionsQueryOptions, symptomQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/symptoms/$symptomId/$severity")({
  component: RouteComponent,
});

function RouteComponent() {
  const { symptomId, severity } = Route.useParams();
  const { isPending: symptomLoading, data: symptom } = useQuery(
    symptomQueryOptions(symptomId)
  );
  const {
    isPending,
    error,
    data: interventions,
  } = useQuery(interventionsQueryOptions(symptom?.interventions || []));
  const filteredInterventions = interventions?.filter((intervention) =>
    intervention.severity.includes(severity)
  );
  if (isPending || symptomLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return "There was an error, please refresh your page.";
  }

  return (
    <div>
      <h1 className="text-2xl pb-4 uppercase">Interventions</h1>
      {filteredInterventions?.map((intervention) => (
        <div key={intervention.id} className="p-4">
          <h3 className="text-lg uppercase mb-4">{intervention.name}</h3>
          <div className="flex">
            <img
              src={intervention.product_image}
              className="rounded p-2 w-32 border"
            />
            <p className="p-4">{intervention.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
