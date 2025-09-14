import { Button } from "@/components/ui/button";
import { symptomsQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import type {Symptom} from "@/types"
export const Route = createFileRoute("/symptoms/")({
  component: Symptoms,
});

function Symptoms() {
  const { isPending, error, data: symptoms } = useQuery(symptomsQueryOptions);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if(error) {
    return "There was an error, please refresh your page."
  }

  return (
    <div>
      <h1 className="text-2xl">Symptoms List</h1>
      <div className="flex-row pt-4">
      {symptoms.map((symptom:Symptom) => <Button variant="outline" className="m-1" key={symptom.id} asChild>
        <Link to="/symptoms/$symptomId" params={{symptomId: symptom.id}}>
          {symptom.name}
        </Link>
      </Button>)}
      </div>
    </div>
  );
}
