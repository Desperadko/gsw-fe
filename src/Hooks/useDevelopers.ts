import { useQuery } from "@tanstack/react-query";
import { DeveloperService } from "../Services/DeveloperService";

function useDevelopers() {
    return useQuery({
        queryKey: ["developers"],
        queryFn: DeveloperService.getAll
    });
}

export default useDevelopers;