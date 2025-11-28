import type { DeveloperDTO } from "../Developer/Developer";
import type { BaseDTO } from "../General/Base";
import type { GenreDTO } from "../Genre/Genre";
import type { PlatformDTO } from "../Platform/Platform";
import type { PublisherDTO } from "../Publisher/Publisher";

export interface ProductDTO extends BaseDTO {
    description: string,
    releaseDate: Date,
    price: number,

    developers: DeveloperDTO[],
    publishers: PublisherDTO[],
    genres: GenreDTO[],
    platforms: PlatformDTO[],

    imageUrl?: string
}