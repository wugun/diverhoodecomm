import React from 'react'
import { useEffect, useState } from "react";

import Image from 'next/image';
import { urlFor } from '@/pages';
import { motion } from "framer-motion";
import { left, right } from '../assets';

const Slider = ({heroSlider}) => {
  const [activeImage, setActiveImage] = useState(0);

  const clickNext = () => {
    activeImage === heroSlider.length - 1
      ? setActiveImage(0)
      : setActiveImage(activeImage + 1);
  };
  const clickPrev = () => {
    activeImage === 0
      ? setActiveImage(heroSlider.length - 1)
      : setActiveImage(activeImage - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeImage]);

  return (
    <div className="grid place-items-center md:grid-cols-2 grid-cols-1 w-full mx-auto max-w-5xl shadow-2xl rounded-2xl">
      <div className="w-full flex justify-center items-center gap-4 transition-transform ease-in-out duration-500 md:rounded-2xl p-6 md:p-0">
       { heroSlider.map((product, idx) => (
            <div
                key={idx}
                className={`${
                idx === activeImage
                    ? "block w-full h-[80vh] object-cover transition-all duration-500 ease-in-out"
                    : "hidden"
                }`}
            >
                <img
                    src={urlFor(product.image)}
                    alt=""
                    width={400}
                    height={400}
                    className="w-full h-full object-cover md:rounded-tl-3xl md:rounded-bl-3xl"
                />
            </div>
       ))}
      </div>
      <div className="grid place-items-start w-full bg-gray-900 relative md:rounded-tr-3xl md:rounded-br-3xl">
        <div className="uppercase text-sm absolute right-4 top-2 underline-offset-4 underline text-gray-200">
             Product Spotlight
        </div>
        {heroSlider.map((elem, idx) => (
        <div
          key={idx}
          className={`${
            idx === activeImage
              ? "block w-full h-full md:h-[80vh] py-20 md:px-20 px-10 text-left"
              : "hidden"
          }`}
        >
          <motion.div
            initial={{
              opacity: idx === activeImage ? 0 : 0.5,
              scale: idx === activeImage ? 0.5 : 0.3,
            }}
            animate={{
              opacity: idx === activeImage ? 1 : 0.5,
              scale: idx === activeImage ? 1 : 0.3,
            }}
            transition={{
              ease: "linear",
              duration: 2,
              x: { duration: 1 },
            }}
            className="w-full"
          >
            <div className="py-2 text-2xl font-extrabold text-white">{elem.productName}</div>
            <div className="leading-relaxed font-small text-base tracking-wide h-60 md:h-40 text-gray-300">
              {" "}
              {elem.desc}
            </div>
          </motion.div>

          <button className="bg-white text-black uppercase px-4 py-2 rounded-md my-10 mt-20 absolute bottom-10">
            Buy now
          </button>
          <div className="absolute md:bottom-1 bottom-10 right-10 md:right-0 w-full flex justify-center items-center">
            <div
              className="absolute bottom-2 right-10 cursor-pointer"
              onClick={clickPrev}
            >
              <Image src={left} alt="" />
            </div>

            <div
              className="absolute bottom-2 right-2 cursor-pointer"
              onClick={clickNext}
            >
              <Image src={right} alt="" />
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Slider
