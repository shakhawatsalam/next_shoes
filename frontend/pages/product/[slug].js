import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io"
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import { fetchDataFromApi } from "@/utils/api";
import { getDiscountendPrice } from "@/utils/helper";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from "@/store/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductDetails = ({ product, products }) => {
    const [selectedSize, setSelectedSize] = useState();
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const p = product?.data?.[0]?.attributes;

    const notify = () => {
        toast.success('Successfully Added To Cart 💖💝💝💖', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }


    // redux Object 
    const cartObject = {
        id: p.id,
        productImage: p?.image?.data
    }



    return (
        <div className="w-full md:py-20">
            <ToastContainer />
            <Wrapper>
                <div className="flex flex-col lg:flex-row  md:px-10 gap-[50px] lg:gap-[100px]">
                    {/* left colum start  */}
                    <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                        <ProductDetailsCarousel images={p?.image?.data} />
                    </div>
                    {/* left colum end  */}
                    {/* right colum start  */}
                    <div className="flex-[1] py-3">
                        {/* Product Title  */}
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                            {p.name}
                        </div>
                        {/* Product Subtitle  */}
                        <div className="text-lg font-semibold mb-5">
                            {p.subtitle}
                        </div>

                        {/* PRODUCT PRICE */}
                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                MRP : &#8377;{p.price}
                            </p>
                            {p.orignal_price && (
                                <>
                                    <p className="text-base  font-medium line-through">
                                        &#8377;{p.orignal_price}
                                    </p>
                                    <p className="ml-auto text-base font-medium text-green-500">
                                        {getDiscountendPrice(
                                            p.orignal_price,
                                            p.price
                                        )}
                                        % off
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="text-md font-medium  text-black/[0.5]">
                            incl. of taxes
                        </div>
                        <div className="text-md font-medium text-black/[0.5] mb-20">
                            {`(Also includes all applicable duties)`}
                        </div>
                        {/* Product  Size Range Starts  */}
                        <div className="mb-10">
                            {/* HEADING START  */}
                            <div className="flex justify-between mb-2" >
                                <div className="text-md font-semibold">
                                    Select Size
                                </div>
                                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                    Select Guide
                                </div>
                            </div>
                            {/* HEADING END  */}
                            {/* SIZE START  */}
                            <div id="sizeGrid" className="grid grid-cols-3 gap-2">
                                {p.size.data.map((item, i) => (
                                    <div key={i} className={`border rounded-md text-center py-3  font-medium ${item.enabled ? 'hover:border-black cursor-pointer' : 'cursor-not-allowed bg-black/[0.1] opacity-50'} ${selectedSize === item.size ? "border-black" : ""} `}

                                        onClick={() => {
                                            setSelectedSize(item.size)
                                            setShowError(false)
                                        }}

                                    >
                                        {item.size}
                                    </div>
                                ))}
                            </div>
                            {/* SIZE  END  */}
                            {/* SHOW ERROR START  */}
                            {showError && <div className="text-red-600 mt-1">
                                Size selection is required
                            </div>}
                            {/* SHOW ERROR END  */}
                            {/* ADD TO CART BUTTON START  */}
                            <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-2"
                                onClick={() => {
                                    if (!selectedSize) {
                                        setShowError(true);
                                        document.getElementById("sizeGrid").scrollIntoView({
                                            block: "center",
                                            behavior: 'smooth'
                                        })
                                    }
                                    dispatch(addToCart({
                                        ...product?.data?.[0],
                                        selectedSize,
                                        oneQuantityPrice: p.price,
                                    }));
                                    notify();
                                }}>Add to Cart</button>
                            {/* ADD TO CART BUTTON END  */}
                            {/* WISH LIST BUTTON  */}
                            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                                Wishlist
                                <IoMdHeartEmpty size={20} />
                            </button>
                            {/* WISH LIST BUTTON  */}
                            <div>
                                <div className="text-lg font-bold mb-5">Product Details</div>
                                <div className="text-md mb-5 markdown">
                                    <ReactMarkdown>
                                        {p.description}
                                    </ReactMarkdown>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* Product  Size Range Starts  */}
                    {/* right colum end  */}
                </div>
                <RelatedProducts products={products} />
            </Wrapper>

        </div>
    )
}

export default ProductDetails;



// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
    const products = await fetchDataFromApi(`/api/products?populate=*`);

    const paths = products?.data?.map((p) => ({
        params: {
            slug: p.attributes.slug
        }
    }));

    return {
        paths,
        fallback: false,
    }
}


// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params: { slug } }) {

    const product = await fetchDataFromApi(`/api/products?populate=*&filters[slug][$eq]=${slug}`);
    const products = await fetchDataFromApi(`/api/products?populate=*&[filters][slug][$ne]=${slug}`);

    return {
        props: {
            product,
            products,
        }
    }

}