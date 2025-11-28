import { useQuery } from "@tanstack/react-query";
import { PlatformService } from "../Services/PlatformService";

export function usePlatforms() {
    const { data, isLoading, error} = useQuery({
        queryKey: ["platforms"],
        queryFn: PlatformService.getAll
    });

    return {
        platforms: data?.dtos ?? [],
        isLoadingPlatforms: isLoading,
        platformsError: error
    }
}