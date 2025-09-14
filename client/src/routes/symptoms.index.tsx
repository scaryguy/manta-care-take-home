import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/symptoms/")({
  component: Symptoms,
});

function Symptoms() {
  return (
    <div>
      <h1 className="text-2xl">Symptoms List</h1>
      <Button variant="outline">
        <Link to="/symptoms/$symptomId" params={{ symptomId: "something" }}>
          Symptom 1
        </Link>
      </Button>
    </div>
  );
}
