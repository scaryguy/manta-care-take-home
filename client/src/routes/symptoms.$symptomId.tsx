import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/symptoms/$symptomId")({
  component: SymptomDetail,
});

function SymptomDetail() {
  const { symptomId } = Route.useParams();
  return (
    <div>
      <h1 className="text-2xl">Symptom Detail</h1>
      <strong>{symptomId}</strong>!
    </div>
  );
}
