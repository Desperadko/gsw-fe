import { useState } from "react";
import InputImage from "../../Components/InputImage/InputImage";
import { useGenres } from "../../../Hooks/useGenres";
import MultiSelectAutocomplete from "../../Components/MultiSelectAutocomplete/MultiSelectAutocomplete";
import { usePlatforms } from "../../../Hooks/usePlatforms";
import { useDevelopers } from "../../../Hooks/useDevelopers";
import { usePublishers } from "../../../Hooks/usePublishers";
import { useAutoExpandingTextarea } from "../../../Hooks/useAutoExpandingTextarea";
import { ImageService } from "../../../Services/ImageService";
import { ProductService } from "../../../Services/ProductService";
import type { AddProductRequest, ProductAddDTO } from "../../../Types/Product/Add";
import type { ApplicationError } from "../../../Types/Error";
import { useErrorHandler } from "../../../Hooks/useErrorHandler";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import type { AddDefaultImageRequest, AddImageRequest, ImageAddDTO } from "../../../Types/Image/Add";
import InputItem from "../../Components/InputItem/InputItem";
import type { AddGenreRequest, GenreAddDTO } from "../../../Types/Genre/Add";
import type { AddPlatformRequest, PlatformAddDto } from "../../../Types/Platform/Add";
import type { AddDeveloperRequest, DeveloperAddDTO } from "../../../Types/Developer/Add";
import type { AddPublisherRequest, PublisherAddDTO } from "../../../Types/Publisher/Add";

function Admin() {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [productImage, setProductImage] = useState<File | undefined>(undefined);
    const [releaseDate, setReleaseDate] = useState<string | undefined>(undefined);
    const [price, setPrice] = useState<string>("");
    const [genresIds, setGenresIds] = useState<number[]>([]);
    const [platformsIds, setPlatformsIds] = useState<number[]>([]);
    const [developersIds, setDevelopersIds] = useState<number[]>([]);
    const [publishersIds, setPublishersIds] = useState<number[]>([]);

    const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(undefined);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

    const fieldNames: string[] = [
        "name", "description", "releasedate",
        "price", "genresids", "platformsids",
        "developersids", "publishersids", "productid", "imagedata",
        "genre.name", "platform.name", "developer.name", "publisher.name"
    ];

    const { errors, processError, clearErrors } = useErrorHandler();

    const textAreaRef = useAutoExpandingTextarea(description, 15);

    const { genres, isLoadingGenres, addGenre, isAddingGenre } = useGenres();
    const { platforms, isLoadingPlatforms, addPlatform, isAddingPlatform } = usePlatforms();
    const { developers, isLoadingDevelopers, addDeveloper, isAddingDeveloper } = useDevelopers();
    const { publishers, isLoadingPublishers, addPublisher, isAddingPublisher } = usePublishers();

    const isLoading: boolean = isLoadingGenres || isLoadingPlatforms || isLoadingDevelopers || isLoadingPublishers;
    
    function handleImageUpload(image: File){
        setProductImage(image);
        setPreviewImageUrl(URL.createObjectURL(image));
    }

    function handleClear(){
        setName("");
        setDescription("");
        setProductImage(undefined);
        setPreviewImageUrl(undefined);
        setReleaseDate(undefined);
        setPrice("");
        setGenresIds([]);
        setPlatformsIds([]);
        setDevelopersIds([]);
        setPublishersIds([]);
    }

    async function handleProductSubmit(){
        setIsLoadingSubmit(true);

        clearErrors(fieldNames);

        const product: ProductAddDTO = {
            name: name,
            description: description,
            releaseDate: releaseDate || "0001-01-01",
            price: parseFloat(price) || 0,
            developersIds: developersIds,
            publishersIds: publishersIds,
            genresIds: genresIds,
            platformsIds: platformsIds
        };

        const request: AddProductRequest = {
            product: product
        };

        try{
            const response = await ProductService.add(request);
            const productId = response.dto.id;

            if(productImage){
                const image: ImageAddDTO = {
                    productId: productId,
                    imageData: productImage
                }

                const request: AddImageRequest = {
                    image: image
                }

                await ImageService.add(request);
            }
            else{
                const request: AddDefaultImageRequest = {
                    productId: productId
                }

                await ImageService.addDefault(request);
            }
        }
        catch(error: unknown){
            processError(error as ApplicationError, fieldNames);
        }
        finally{
            setIsLoadingSubmit(false);
        }
    }

    function handleGenreSubmit(name: string){
        const genre: GenreAddDTO = {
            name: name
        }

        const request: AddGenreRequest = {
            genre: genre
        }

        addGenre(request)
            .catch((errors: ApplicationError) => {
                processError(errors, fieldNames);
            });
    }

    function handlePlatformSubmit(name: string){
        const platform: PlatformAddDto = {
            name: name
        }

        const request: AddPlatformRequest = {
            platform: platform
        }

        addPlatform(request)
            .catch((error: ApplicationError) => {
                processError(error, fieldNames);
            });
    }

    function handleDeveloperSubmit(name: string){
        const developer: DeveloperAddDTO = {
            name: name
        }

        const request: AddDeveloperRequest = {
            developer: developer
        }

        addDeveloper(request)
            .catch((error: ApplicationError) => {
                processError(error, fieldNames);
            });
    }

    function handlePublisherSubmit(name: string) {
        const publisher: PublisherAddDTO = {
            name: name
        }

        const request: AddPublisherRequest = {
            publisher: publisher
        }

        addPublisher(request)
            .catch((error: ApplicationError) => {
                processError(error, fieldNames);
            });
    }

    if(isLoading) return <div>Loading...</div>

    return(
        <div
            className="
            flex
            flex-col
            justify-center items-center
            m-10
            gap-20">
            <div className="
                flex flex-col
                justify-center items-center
                w-fit
                gap-10">
                <div className="
                    flex
                    flex-col sm:flex-row
                    sm:justify-between
                    w-full
                    gap-10">
                    <div className="flex justify-center items-center">
                        <InputImage
                            multiple={false}
                            onImageUpload={handleImageUpload}
                            placeholderUrl={previewImageUrl}/>
                        {errors && errors.image && (
                            <ErrorMessage message={errors.image}/>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                            name="title"
                            type="text"
                            placeholder="Title.."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-2 border-b-1"/>
                        {errors && errors.name && (
                            <ErrorMessage message={errors.name}/>
                        )}
                        <textarea
                            ref={textAreaRef}
                            name="description"
                            placeholder="Description.."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className=" resize-none p-2 border-b-1"></textarea>
                        {errors && errors.description && (
                            <ErrorMessage message={errors.description}/>
                        )}
                    </div>
                </div>
                <div className="flex
                    flex-col sm:flex-row
                    sm:justify-between
                    w-full
                    gap-10 sm:gap-0">
                    <div className="flex flex-col gap-2">
                        <MultiSelectAutocomplete
                            suggestions={genres}
                            selectedIds={genresIds}
                            onSelectionChange={setGenresIds}
                            placeholder="Type a genre.."/>
                        {errors && errors.genresids && (
                            <ErrorMessage message={errors.genresids}/>
                        )}
                        <MultiSelectAutocomplete
                            suggestions={platforms}
                            selectedIds={platformsIds}
                            onSelectionChange={setPlatformsIds}
                            placeholder="Type a platform.."/>
                        {errors && errors.platformsids && (
                            <ErrorMessage message={errors.platformsids}/>
                        )}
                        <MultiSelectAutocomplete
                            suggestions={developers}
                            selectedIds={developersIds}
                            onSelectionChange={setDevelopersIds}
                            placeholder="Type a developer.."/>
                        {errors && errors.developersids && (
                            <ErrorMessage message={errors.developersids}/>
                        )}
                        <MultiSelectAutocomplete
                            suggestions={publishers}
                            selectedIds={publishersIds}
                            onSelectionChange={setPublishersIds}
                            placeholder="Type a publisher.."/>
                        {errors && errors.publishersids && (
                            <ErrorMessage message={errors.publishersids}/>
                        )}
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="flex flex-col gap-2">
                            <input
                                type="date"
                                placeholder="Release Date.."
                                value={releaseDate}
                                onChange={(e) => setReleaseDate(e.target.value)}
                                className="p-2 border-b-1"/>
                            {errors && errors.releasedate && (
                                <ErrorMessage message={errors.releasedate}/>
                            )}
                            <input
                                type="number"
                                placeholder="Price.."
                                min={0}
                                step={0.01}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="p-2 border-b-1"/>
                            {errors && errors.price && (
                                <ErrorMessage message={errors.price}/>
                            )}
                        </div>
                        <div className="flex flex-row justify-between">
                            <button
                                onClick={handleClear}
                                disabled={isLoadingSubmit}
                                className="
                                    p-2
                                    hover:text-flame
                                    transition-colors duration-100">
                                    Clear
                            </button>
                            <button
                                onClick={handleProductSubmit}
                                disabled={isLoadingSubmit}
                                className="
                                    p-2
                                    hover:text-flame
                                    transition-colors duration-100">
                                    {isLoadingSubmit
                                        ? "Submitting.."
                                        : "Submit"
                                    }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="
                    flex flex-col
                    gap-15">
                <div
                    className="
                        flex
                        flex-col md:flex-row
                        gap-15">
                    <div className="w-75">
                        <InputItem
                            onSubmit={handleGenreSubmit}
                            items={genres}
                            isSubmitting={isAddingGenre}
                            onSubmitError={errors["genre.name"]}
                            placeholder="Genre.."/>
                    </div>
                    <div className="w-75">
                        <InputItem
                            onSubmit={handlePlatformSubmit}
                            items={platforms}
                            isSubmitting={isAddingPlatform}
                            onSubmitError={errors["platform.name"]}
                            placeholder="Platform.."/>
                    </div>
                </div>
                <div
                    className="
                        flex
                        flex-col md:flex-row
                        gap-15">
                    <div className="w-75">
                        <InputItem
                            onSubmit={handleDeveloperSubmit}
                            items={developers}
                            isSubmitting={isAddingDeveloper}
                            onSubmitError={errors["developer.name"]}
                            placeholder="Developer.."/>
                    </div>
                    <div className="w-75">
                        <InputItem
                            onSubmit={handlePublisherSubmit}
                            items={publishers}
                            isSubmitting={isAddingPublisher}
                            onSubmitError={errors["publisher.name"]}
                            placeholder="Publisher.."/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;