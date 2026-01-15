import type { ProductDTO } from "../../../Types/Product/Product";

interface ProductCardProps{
    product: ProductDTO;
    minimalistic?: boolean;
}

function ProductCard({ product, minimalistic = false } : ProductCardProps){
  
  return(
    <div
      className="
      flex flex-col
      h-full
      bg-timberwolf
      shadow-md hover:shadow-2xl
      transition-shadow duration-75
      rounded-lg overflow-hidden">
      <img
        src={product.imageURL}
        alt={product.name}
        loading="lazy"
        className="
          w-full h-48
          object-fit
          pb-2"/>
      <div>
        <h3
          className="
            p-2
            font-bold
            text-eerie-black">
          {product.name}
        </h3>
        {!minimalistic && (
          <div
            className="
              flex flex-wrap
              gap-1
              mx-2">
            {
              product.genres.map((genre) => {
                return(
                  <p
                    key={genre.id}
                    className="
                    text-eerie-black
                    bg-floral-white rounded-4xl
                    font-medium text-sm
                    whitespace-nowrap
                    px-2">
                    {genre.name}
                  </p>
                )
              })
            }
            {
              product.platforms.map((platform) => {
                return(
                  <p
                    key={platform.id}
                    className="
                    text-eerie-black
                    bg-floral-white rounded-4xl
                    font-medium text-sm
                    whitespace-nowrap
                    px-2">
                    {platform.name}
                  </p>
                )
              })
            }
          </div>
        )}
      </div>
      <div
        className="mt-auto">
        <div
          className={[
            "flex",
            minimalistic
            ? "justify-end"
            : "justify-between"
          ].join(" ")}>
          {!minimalistic && (
            <div
              className="
                p-2">
              <div
                className="
                  flex gap-1">
                <p
                  className="
                    text-eerie-black
                    font-medium text-sm">
                  Developers:
                </p>
                {product.developers.map((developer) => {
                  return(
                    <p
                      className="
                        text-eerie-black
                        font-medium text-sm">
                          {developer.name}
                    </p>
                  )
                })}
              </div>
              <div
                className="
                  flex gap-1">
                <p
                  className="
                    text-eerie-black
                    font-medium text-sm">
                  Publishers:
                </p>
                {product.publishers.length !== 0 
                  ? product.publishers.map((publisher) => {
                    return(
                      <p
                        className="
                          text-eerie-black
                          font-medium text-sm">
                            {publisher.name}
                      </p>
                    )
                  })
                  : (
                    <p
                      className="
                          text-eerie-black
                          font-medium text-sm">
                            {product.developers[0].name}
                    </p>
                  )
                }
              </div>
            </div>
          )}
          <p
            className="
              text-eerie-black
              mt-auto
              p-2">
            {product.price}€
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;