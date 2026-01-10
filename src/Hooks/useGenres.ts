import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GenreService } from "../Services/GenreService";

export function useGenres() {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["genres"],
        queryFn: GenreService.getAll
    });

    const addMutation = useMutation({
        mutationFn: GenreService.add,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["genres"] });
        }
    });

    return{
        genres: data?.dtos ?? [],
        isLoadingGenres: isLoading,
        genresError: error,

        addGenre: addMutation.mutateAsync,
        isAddingGenre: addMutation.isPending,
    }
}