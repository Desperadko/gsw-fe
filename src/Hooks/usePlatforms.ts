import { useQuery } from "@tanstack/react-query";
import { PlatformService } from "../Services/PlatformService";

function usePlatforms() {
    return useQuery({
        queryKey: ["platforms"],
        queryFn: PlatformService.getAll
    });
}

export default usePlatforms;