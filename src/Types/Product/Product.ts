import type { DeveloperDTO } from "../Developer/Developer";
import type { BaseWithIdAndNameDTO } from "../General/Base";
import type { GenreDTO } from "../Genre/Genre";
import type { PlatformDTO } from "../Platform/Platform";
import type { PublisherDTO } from "../Publisher/Publisher";

export interface ProductDTO extends BaseWithIdAndNameDTO {
    description: string,
    releaseDate: Date,
    price: number,

    developers: DeveloperDTO[],
    publishers: PublisherDTO[],
    genres: GenreDTO[],
    platforms: PlatformDTO[],

    imageUrl?: string
}