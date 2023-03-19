import Link from "next/link";
import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  // console.log(window.screenY);

  const controlNavbar = () => {
    if (window.scrollY > 300) {
      
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY)
  };

  // Nav Bar scroll Effect
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);
  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300  ${show}`}>
      <Wrapper className='h-[60px] flex justify-between items-center'>
        <Link href='/'>
          <img src='/logo.svg' alt='' className='w-[40px] md:w-[60px]' />
        </Link>
        <Menu showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} />
        {mobileMenu ? (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
          />
        ) : (
          ""
        )}
        <div className='flex items-center gap-2 text-black'>
          {/* icon start  */}
          <div className='w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative'>
            <IoMdHeartEmpty className='text-[19px] md:text-[24px]' />
            <div className='h-[14px] md:h-[18px]   min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]'>
              5
            </div>
          </div>
          {/* icon end  */}
          {/* icon start  */}
          <div className='w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative'>
            <BsCart className='text-[15px] md:text-[20px]' />
            <div className='h-[14px] md:h-[18px]   min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]'>
              5
            </div>
          </div>
          {/* icon end  */}
          {/* mobile icon start */}
          <div className='w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2 md:hidden'>
            {mobileMenu ? (
              <VscChromeClose
                className='text-[16px]'
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className='text-[24px]'
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* mobile icon start */}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
