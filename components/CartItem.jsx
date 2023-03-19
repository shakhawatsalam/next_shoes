import React from "react";

import { RiDeleteBin6Line } from "react-icons/ri";

const CartItem = () => {
  return (
    <div className='flex py-5 gap-3 md:gap-5 border-b'>
      {/* IMAGE START  */}
      <div className='shrink-0 aspect-square w-[50px] md:w-[120px]'>
        <img src='product-1.webp' alt='' />
      </div>
      {/* IMAGE END  */}
      <div className='w-full flex flex-col'>
        <div className='flex flex-col md:flex-row justify-between'>
          {/* PRODUCT TITLE  */}
          <div className='text-lg md:text-2xl font-semibold text-black/[0.8]'>
            Jordan Retro 6 G
          </div>
          {/* PRODUCT SUBTITLE  */}
          <div className='text-sm md:test-md font-medium text-black/[0.5] block md:hidden'>
            Men's Golf Shoes
          </div>
          {/* PRODUCT PRICE  */}
          <div className='text-sm  md:text-md font-bold text-black/[0.5 mt-2]'>
            $133.58
          </div>
        </div>
        {/* PRODUCT SUBTITLE  */}
        <div className='text-sm md:test-md font-medium text-black/[0.5] block hidden md:block'>
          Men's Golf Shoes
        </div>

        {/* JLAJLD  */}
        <div className='flex items-center justify-between mt-4'>
          <div className='flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md'>
            <div className='flex items-center gap-1'>
              <div className='font-semibold'>Size</div>
              <select name='' id='' className='hover:text-black'>
                <option value='1'>UK </option>
                <option value='2'>UK 6</option>
                <option value='3'>UK 6</option>
                <option value='4'>UK 6</option>
                <option value='5'>UK 6</option>
                <option value='6'>UK 6</option>
                <option value='7'>UK 6</option>
                <option value='8'>UK 6</option>
                <option value='9'>UK 6</option>
                <option value='10'>UK 6</option>
                <option value='11'>UK 6</option>
                <option value='12'>UK 6</option>
              </select>
            </div>
            <div className='flex items-center gap-1'>
              <div className='font-semibold'>Quantity</div>
              <select name='' id='' className='hover:text-black'>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>5</option>
                <option value='4'>5</option>
                <option value='5'>5</option>
                <option value='6'>5</option>
                <option value='7'>5</option>
                <option value='8'>5</option>
                <option value='9'>5</option>
                <option value='10'>6</option>
                <option value='11'>6</option>
                <option value='12'>6</option>
              </select>
            </div>
                  </div>
                  
                <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:test-[20px]"/>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
