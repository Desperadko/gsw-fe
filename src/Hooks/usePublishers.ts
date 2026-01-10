import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PublisherService } from "../Services/PublisherService";

export function usePublishers() {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["publishers"],
        queryFn: PublisherService.getAll
    });

    const addMutation = useMutation({
        mutationFn: PublisherService.add,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["publishers"] });
        }
    })

    return {
        publishers: data?.dtos ?? [],
        isLoadingPublishers: isLoading,
        publishersError: error,

        addPublisher: addMutation.mutateAsync,
        isAddingPublisher: addMutation.isPending,
    }
}