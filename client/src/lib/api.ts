import type { ApiResponse, Symptom } from "@/types";
import { queryOptions } from "@tanstack/react-query";
const API_BASE_URL = "http://localhost:3030";

export const getSymptoms = async (): Promise<Symptom[]> => {
  const res = await fetch(API_BASE_URL + "/symptoms/getAll");
  if (!res.ok) throw new Error("Couldn't fetch symptoms");

  const response: ApiResponse<Symptom[]> = await res.json();

  if (response.code !== 200) {
    throw new Error("Failed to fetch symptom");
  }

  if (typeof response.message === "string") {
    throw new Error(response.message);
  }

  return response.message;
};

export const getSymptom = async (id: number): Promise<Symptom> => {
  const res = await fetch(API_BASE_URL + "/symptoms/getById/" + id);
  if (!res.ok) throw new Error("Couldn't fetch symptom with id " + id);

  const response: ApiResponse<Symptom> = await res.json();

    if (response.code !== 200) {
    throw new Error("Failed to fetch symptom");
  }

  if (typeof response.message === "string") {
    throw new Error(response.message);
  }
    return response.message;
};

export const symptomsQueryOptions = queryOptions({
  queryKey: ["symptoms"],
  queryFn: getSymptoms,
});

export const symptomQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["symptom", id],
    queryFn: ()=> getSymptom(id),
  });
