import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Button variant="outline" asChild>
        <Link to="/symptoms">Symptoms</Link>
      </Button>
    </>
  );
}
