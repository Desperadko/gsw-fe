import { useQuery } from "@tanstack/react-query";
import { PlatformService } from "../Services/PlatformService";

function usePublishers() {
    return useQuery({
        queryKey: ["platforms"],
        queryFn: PlatformService.getAll
    });
}

export default usePublishers;