import type { ProductDTO } from "../../../Types/Product/Product";

interface ProductStripProps{
  product: ProductDTO;
}

function ProductStrip({ product }: ProductStripProps){

  return(
    <div
      className="
      flex
      bg-timberwolf
      shadow-md hover:shadow-2xl
      transition-shadow duration-75
      rounded-lg overflow-hidden">
      <img
        src={product.imageURL}
        alt={product.name}
        loading="lazy"
        className="
        w-24 h-24
        object-cover"/>
      <div
        className="
        flex
        flex-grow
        justify-between">
        <div
          className="
          flex flex-col
          justify-around
          p-2">
          <h3
            className="
            text-eerie-black
            font-bold
            w-fit h-fit">
            {product.name}
          </h3>
          <div
            className="
            flex
            gap-1">
            {
              product.genres.map((genre) => {
                return(
                  <p
                    key={genre.id}
                    className="
                    text-eerie-black
                    bg-floral-white rounded-4xl
                    font-medium text-sm
                    w-fit h-fit
                    px-2">
                    {genre.name}
                  </p>
                )
              })
            }
            {
              product.platforms.map((genre) => {
                return(
                  <p
                    key={genre.id}
                    className="
                    text-eerie-black
                    bg-floral-white rounded-4xl
                    font-medium text-sm
                    w-fit h-fit
                    px-2">
                    {genre.name}
                  </p>
                )
              })
            }
            </div>
        </div>
        <p
          className="
          text-eerie-black
          w-fit h-fit
          p-2 mt-auto">
          {product.price}€
        </p>
      </div>
    </div>
  )
}

export default ProductStrip;