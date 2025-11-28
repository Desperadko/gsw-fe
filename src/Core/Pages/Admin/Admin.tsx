import { useState } from "react";
import InputImage from "../../Components/InputImage/InputImage";
import { useGenres } from "../../../Hooks/useGenres";
import MultiSelectAutocomplete from "../../Components/MultiSelectAutocomplete/MultiSelectAutocomplete";
import { usePlatforms } from "../../../Hooks/usePlatforms";
import { useDevelopers } from "../../../Hooks/useDevelopers";
import { usePublishers } from "../../../Hooks/usePublishers";

function Admin() {
    const [productImage, setProductImage] = useState<File | undefined>(undefined);
    const [genresIds, setGenresIds] = useState<number[]>([]);
    const [platformsIds, setPlatformsIds] = useState<number[]>([]);
    const [developersIds, setDevelopersIds] = useState<number[]>([]);
    const [publishersIds, setPublishersIds] = useState<number[]>([]);

    const { genres, isLoadingGenres } = useGenres();
    const { platforms, isLoadingPlatforms } = usePlatforms();
    const { developers, isLoadingDevelopers } = useDevelopers();
    const { publishers, isLoadingPublishers } = usePublishers();

    console.log(genresIds);

    const isLoading: boolean = isLoadingGenres || isLoadingPlatforms || isLoadingDevelopers || isLoadingPublishers;
    
    function handleImageUpload(image: File){
        setProductImage(image);
    }

    if(isLoading) return <div>Loading...</div>

    return(
        <div
            className="
            flex justify-center items-center
            max-w-250
            mx-10 sm:mx-auto">
            <div className="
                flex
                flex-col justify-center items-center
                my-10 sm:mx-10 mx-auto
                w-fit
                gap-10">
                <div className="
                    flex
                    flex-col sm:flex-row
                    justify-center
                    gap-5 sm:gap-20
                    w-fit">
                    <div className="flex justify-center items-center">
                        <InputImage
                            multiple={false}
                            onImageUpload={handleImageUpload}/>
                    </div>
                    <div className="flex flex-col">
                        <input name="title" type="text" placeholder="Title.." className="p-2"/>
                        <textarea name="description" placeholder="Description.." className="resize-none p-2"></textarea>
                    </div>
                </div>
                <div className="flex
                    flex-col sm:flex-row
                    gap-5 sm:gap-20
                    sm:justify-between
                    w-full">
                    <div className="flex flex-col gap-2">
                        <MultiSelectAutocomplete
                            suggestions={genres}
                            selectedIds={genresIds}
                            onSelectionChange={setGenresIds}
                            placeholder="Type a genre.."/>
                        <MultiSelectAutocomplete
                            suggestions={platforms}
                            selectedIds={platformsIds}
                            onSelectionChange={setPlatformsIds}
                            placeholder="Type a platform.."/>
                        <MultiSelectAutocomplete
                            suggestions={developers}
                            selectedIds={developersIds}
                            onSelectionChange={setDevelopersIds}
                            placeholder="Type a developer.."/>
                        <MultiSelectAutocomplete
                            suggestions={publishers}
                            selectedIds={publishersIds}
                            onSelectionChange={setPublishersIds}
                            placeholder="Type a publisher.."/>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col">
                            <input type="date" placeholder="Release Date.." className="p-2"/>
                            <input type="text" placeholder="Price.." className="p-2"/>
                        </div>
                        <div className="flex flex-row justify-end gap-10">
                            <button className="p-2">Clear</button>
                            <button className="p-2">Sumbit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;