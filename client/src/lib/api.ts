import { queryOptions } from "@tanstack/react-query";

export const getSymptoms = async()=> {
    const res = await fetch('http://localhost:3030/symptoms/getAll')
    if(!res.ok) throw new Error("Couldn't fetch symptoms")
    return await res.json()
}

export const symptomsQueryOptions = queryOptions({
    queryKey: ["symptoms"],
    queryFn: getSymptoms
})