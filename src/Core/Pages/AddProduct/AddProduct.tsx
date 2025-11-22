import { useState } from "react";
import ImageInput from "../../Components/ImageInput/ImageInput";
import useDevelopers from "../../../Hooks/useDevelopers";
import useGenres from "../../../Hooks/useGenres";
import usePlatforms from "../../../Hooks/usePlatforms";
import usePublishers from "../../../Hooks/usePublishers";

function AddProduct() {
    const [productImage, setProductImage] = useState<File | undefined>(undefined);

    const genresQueryResult = useGenres();
    const platformsQueryResult = usePlatforms();
    const developersQueryResult = useDevelopers();
    const publishersQueryResult = usePublishers();

    return(
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
                    <ImageInput multiple={false}></ImageInput>
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
                    <input type="text" placeholder="Developers.." className="p-2"/>
                    <input type="text" placeholder="Publishers.." className="p-2"/>
                    <input type="text" placeholder="Genres.." className="p-2"/>
                    <input type="text" placeholder="Platforms.." className="p-2"/>
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
    );
}

export default AddProduct;