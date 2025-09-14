import type { ApiResponse, Intervention, Symptom } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { checkForErrors } from "./utils";
const API_BASE_URL = "http://localhost:3030";

export const getSymptoms = async (): Promise<Symptom[]> => {
  const res = await fetch(API_BASE_URL + "/symptoms/getAll");
  if (!res.ok) throw new Error("Couldn't fetch symptoms");

  const response: ApiResponse<Symptom[]> = await res.json();

  checkForErrors(response);
  return response.message as Symptom[];
};

export const getSymptom = async (id: number): Promise<Symptom> => {
  const res = await fetch(API_BASE_URL + "/symptoms/getById/" + id);
  if (!res.ok) throw new Error("Couldn't fetch symptom with id " + id);

  const response: ApiResponse<Symptom> = await res.json();

  checkForErrors(response);
  return response.message as Symptom;
};

export const getInterventions = async(ids: number[]): Promise<Intervention[]> => {
    // Normally the backend API needs to be accepting an array of ids and use IN [id1, id2, id3] 
    // with SQL for an efficient query. Since we only have getAll or getById, we're doing this.

    const getInterventions = ids.map(id=> fetch(API_BASE_URL + "/interventions/getById/" + id))
    const allResponses = await Promise.all(getInterventions)
    const allJsons = await Promise.all(allResponses.map(res=> res.json()))
    const interventions = allJsons.map(json=> json.message)
    
    return interventions as Intervention[]

}

export const symptomsQueryOptions = queryOptions({
  queryKey: ["symptoms"],
  queryFn: getSymptoms,
});

export const symptomQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["symptom", id],
    queryFn: () => getSymptom(id),
    staleTime: 5 * 60 * 1000
  });

export const interventionsQueryOptions = (ids: number[])=> queryOptions({
    queryKey: ["interventions", ids.join(",")],
    queryFn: ()=> getInterventions(ids)
})
