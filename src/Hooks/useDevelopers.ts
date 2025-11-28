import { useQuery } from "@tanstack/react-query";
import { DeveloperService } from "../Services/DeveloperService";

export function useDevelopers() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["developers"],
        queryFn: DeveloperService.getAll
    });

    return {
        developers: data?.dtos ?? [],
        isLoadingDevelopers: isLoading,
        developersError: error
    }
}