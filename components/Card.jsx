import React from 'react';

import Link from 'next/link';
import { download } from '../assets';
import { downloadImage } from '../utils';
import { AiOutlineDownload } from "react-icons/ai";

const Card = ({ _id, name, prompt, photo, category, color, style }) => (
  <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
    <img
      className="w-full h-auto object-cover rounded-xl"
      src={photo}
      alt={prompt}
    />
    <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
        <p className="text-white text-sm">{name}</p>
      </div>
      <div className="mt-5 flex justify-end items-center gap-2">
        <Link href={{
          pathname: '/shop',
          query: { category: category, color: color, style: style },
        }}>
          <button type="button" className="text-xs text-white border-1 border-white bg-transparent py-1 px-2 cursor-pointer hover:bg-white hover:text-black transition-colors duration-300 ml-2">
              Inspire Me
          </button>
        </Link>
        <button type="button" onClick={() => downloadImage(_id, photo)} className="border-1 border-white text-white bg-transparent py-1 px-2 cursor-pointer hover:bg-white hover:text-black transition-colors duration-300 ml-2">
          <AiOutlineDownload />
        </button>
      </div>
    </div>
  </div>
);

export default Card;