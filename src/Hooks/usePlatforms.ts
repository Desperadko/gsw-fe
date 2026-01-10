import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlatformService } from "../Services/PlatformService";

export function usePlatforms() {
    const queryClient = useQueryClient();

    const { data, isLoading, error} = useQuery({
        queryKey: ["platforms"],
        queryFn: PlatformService.getAll
    });

    const addMutation = useMutation({
        mutationFn: PlatformService.add,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["platforms"] });
        }
    })

    return {
        platforms: data?.dtos ?? [],
        isLoadingPlatforms: isLoading,
        platformsError: error,

        addPlatform: addMutation.mutateAsync,
        isAddingPlatform: addMutation.isPending,
    }
}