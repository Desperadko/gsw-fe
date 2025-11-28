import { useQuery } from "@tanstack/react-query";
import { PublisherService } from "../Services/PublisherService";

export function usePublishers() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["publishers"],
        queryFn: PublisherService.getAll
    });

    return {
        publishers: data?.dtos ?? [],
        isLoadingPublishers: isLoading,
        publishersError: error
    }
}