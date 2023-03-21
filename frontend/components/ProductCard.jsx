import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getDiscountendPrice } from "@/utils/helper";

const ProductCard = ({ data: { attributes: product, id } }) => {
  console.log(product.price);
  
  return (
    <Link
      href={`/product/${product.slug}`}
      className='transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer'>
      <Image
        width={500}
        height={500}
        src={product.thumbnail.data.attributes.url}
        alt={product.name}
      />
      <div className='p-4 text-base/[0.9]'>
        <h2 className='text-lg font-medium'>{product?.name}</h2>
        <div className='flex items-center text-black/[0.5]'>
          <p className='mr-2 text-lg font-semibold'>${product?.price}</p>

          {product?.orignal_price && (
            <>
              <p className='text-base  font-medium line-through'>
                &#8377;{product.original_price}
              </p>
              <p className='ml-auto text-base font-medium text-green-500'>
                {getDiscountendPrice(product.orignal_price, product.price)}% off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
