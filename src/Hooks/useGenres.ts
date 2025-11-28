import { useQuery } from "@tanstack/react-query";
import { GenreService } from "../Services/GenreService";

export function useGenres() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["genres"],
        queryFn: GenreService.getAll
    });

    return{
        genres: data?.dtos ?? [],
        isLoadingGenres: isLoading,
        genresError: error,
    }
}