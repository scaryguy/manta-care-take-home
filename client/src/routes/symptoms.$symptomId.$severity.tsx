import { interventionsQueryOptions, symptomQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

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
      <h1 className={"text-2xl pb-4 uppercase"}>Interventions</h1>
      {filteredInterventions?.length === 0 && "No intervensions have been found."}
      {filteredInterventions?.map((intervention) => (
        <div key={intervention.id} className="p-4">
          <div className="flex items-center mb-4">
            <Link to={intervention.product_link} target="_blank">
              <h3 className="flex text-lg uppercase align-items font-bold hover:underline">
                {intervention.name}

                <ArrowTopRightOnSquareIcon className="size-3 mt-1 ml-1 text-blue-600" />
              </h3>
            </Link>
            {intervention.SOS && (
              <Badge variant="destructive" className="ml-2 h-6">
                S.O.S
              </Badge>
            )}
          </div>
          <div className="flex">
            <img
              src={intervention.product_image}
              className="rounded p-2 w-32 border min-w-32"
              alt={intervention.name}
            />
            <p className="p-4">{intervention.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
