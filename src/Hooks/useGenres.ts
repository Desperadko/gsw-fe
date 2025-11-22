import { useQuery } from "@tanstack/react-query";
import { GenreService } from "../Services/GenreService";

function useGenres() {
    return useQuery({
        queryKey: ["genres"],
        queryFn: GenreService.getAll 
    });
}

export default useGenres;