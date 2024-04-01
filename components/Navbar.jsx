import React from 'react';
import Link from 'next/link';
import { FiHeart } from "react-icons/fi";
import { AiOutlineShopping, AiOutlineUserAdd } from "react-icons/ai";

const Navbar = ({ handleInputChange, query }) => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Diverhood</Link>
      </p>

      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Search furniture"
        />
      </div>

      <button type="button" className="cart-icon">
        <AiOutlineShopping />
        <span className="cart-item-qty">1</span>
      </button>

      <Link href="/shop">
          Shop
      </Link>

      <Link href="/visualize">
          Visualize
      </Link>
    </div>
  )
}

export default Navbar
