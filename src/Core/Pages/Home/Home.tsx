import { useEffect, useState } from "react";
import type { ProductDTO } from "../../../Types/Product/Product";
import { ProductService } from "../../../Services/ProductService";
import type { GetProductsRequest } from "../../../Types/Product/Get";
import ProductCard from "../../Components/ProductCard/ProductCard";
import ProductStrip from "../../Components/ProductStrip/ProductStrip";

function Home() {
  const [latestProducts, setLatestProducts] = useState<ProductDTO[]>([]);
  const [blizzardProducts, setBlizzardProducts] = useState<ProductDTO[]>([]);
  const [newReleases, setNewReleases] = useState<ProductDTO[]>([]);
  const [allProducts, setAllProducts] = useState<ProductDTO[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);

        const latestRequest: GetProductsRequest = {
            filter: undefined,
            sort: undefined,
            pagination: { page: 1, size: 4 }
        };

        const blizzardRequest: GetProductsRequest = {
            filter: { developersIds: [1] },
            sort: undefined,
            pagination: { page: 1, size: 5 }
          };
        
        const newReleasesRequest: GetProductsRequest = {
          filter: undefined,
          sort: { sortBy: "releasedate", sortDirection: "desc" },
          pagination: { page: 1, size: 5 }
        }

        const allProductsRequest: GetProductsRequest = {
          filter: undefined,
          sort: undefined,
          pagination: undefined
        }
          
        try {
          const [latestResponse, blizzardResponse, releasesResponse, allProductsResponse] = await Promise.all([
            ProductService.getAll(latestRequest),
            ProductService.getAll(blizzardRequest),
            ProductService.getAll(newReleasesRequest),
            ProductService.getAll(allProductsRequest),
          ]);
          
          setLatestProducts(latestResponse.dtos);
          setBlizzardProducts(blizzardResponse.dtos);
          setNewReleases(releasesResponse.dtos);
          setAllProducts(allProductsResponse.dtos);
        } finally {
          setLoading(false);
        }
    };

    fetchData();

  }, [])
  
  if(loading) return <div>Loading...</div>
  
  return(
    <div
      className="
        flex flex-col
        gap-10
        my-10
        mx-5 sm:mx-30">
      <div>
        <h3
          className="
            text-floral-white
            text-left
            font-extrabold text-3xl
            tracking-widest
            border-b-1
            pb-2 mb-10">
          Latest
        </h3>
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6">
            {latestProducts?.map((product) => {
              return(
                <ProductCard
                  product={product}
                  minimalistic={false}
                  key={product.id}/>
              )
            })}
        </div>
      </div>
      <div
        className="
        flex
        flex-col md:flex-row
        justify-between
        gap-6">
        <div
          className="
          flex-1">
          <h3
            className="
              text-floral-white
              text-center
              font-extrabold text-3xl
              tracking-wide
              border-b-1
              pb-2 mb-10">
                New Releases
          </h3>
          <div
            className="
            flex flex-col
            gap-4">
            {newReleases?.map((product) => {
              return(
                <ProductStrip
                  product={product}
                  key={product.id}/>
              )
            })}
          </div>
        </div>
        <div
          className="
          flex-1">
          <h3
            className="
              text-floral-white
              text-center
              font-extrabold text-3xl
              tracking-wide
              border-b-1
              pb-2 mb-10">
                Blizzard Hits
          </h3>
          <div
            className="
            flex flex-col
            gap-4">
            {blizzardProducts?.map((product) => {
              return(
                <ProductStrip
                  product={product}
                  key={product.id}/>
              )
            })}
          </div>
        </div>
      </div>
      <div>
        <h3
          className="
            text-floral-white
            text-center
            font-extrabold text-3xl
            tracking-widest
            border-b-1
            pb-2 mb-10">
          Browse
        </h3>
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6">
            {allProducts?.map((product) => {
              return(
                <ProductCard
                  product={product}
                  minimalistic={true}
                  key={product.id}/>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Home;