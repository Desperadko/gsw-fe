import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeveloperService } from "../Services/DeveloperService";

export function useDevelopers() {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["developers"],
        queryFn: DeveloperService.getAll
    });

    const addMutation = useMutation({
        mutationFn: DeveloperService.add,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["developers"] });
        }
    });

    return {
        developers: data?.dtos ?? [],
        isLoadingDevelopers: isLoading,
        developersError: error,

        addDeveloper: addMutation.mutateAsync,
        isAddingDeveloper: addMutation.isPending,
    }
}