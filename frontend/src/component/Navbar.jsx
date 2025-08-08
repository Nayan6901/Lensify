import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import menImg from "../assets/photos/men.jpg";
import womenImg from "../assets/photos/women.jpg";
import sunmenImg from "../assets/photos/mensun.jpg";
import sunwomenImg from "../assets/photos/sunwomen.webp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar({ isAuthenticated }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const timeoutRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(menu);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      console.log(
        "Navbar useEffect: isAuthenticated =",
        isAuthenticated,
        "token =",
        token
      );
      axios
        .get("http://localhost:8000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Profile API response:", res.data.data);
          setUser(res.data.data);
        })
        .catch((err) => {
          console.log("Profile API error:", err);
          setUser(null);
        });
    } else {
      console.log("Navbar useEffect: Not authenticated");
    }
  }, [isAuthenticated]);
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 200); // Delay in ms — adjust to feel smooth
  };
  return (
    <nav className=" flex justify-between items-center px-6 py-2 bg-white shadow sticky top-0 z-50">
      {/* Left: Logo */}

      <div className="flex-shrink-0">
        <h1 className="font-semibold text-2xl p-2">Lensify</h1>
      </div>

      {/* Mobile Nav Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[72px] z-40 bg-white/90 p-6 flex flex-col gap-4 transition-transform duration-300">
          <Link to="/eyeglasses" onClick={() => setMobileMenuOpen(false)}>
            Eyeglasses
          </Link>
          <Link to="/sunglasses" onClick={() => setMobileMenuOpen(false)}>
            Sunglasses
          </Link>
          <Link to="/accessories" onClick={() => setMobileMenuOpen(false)}>
            Accessories
          </Link>
          <Link to="/quiz" onClick={() => setMobileMenuOpen(false)}>
            Take Quiz
          </Link>
          <Link to="/offers" onClick={() => setMobileMenuOpen(false)}>
            Offers
          </Link>
        </div>
      )}

      {/* Center: Nav Links */}
      <div className="hidden md:flex gap-6">
        {/* Eyeglasses */}

        <div
          onMouseEnter={() => handleMouseEnter("eyeglasses")}
          onMouseLeave={handleMouseLeave}
          className="relative transition duration-200 ease-in-out"
        >
          <button className="hover:underline">Eyeglasses</button>
          {openMenu === "eyeglasses" && (
            <div className="fixed left-1/2 -translate-x-1/2  mt-4 bg-white shadow-xl ring-1 ring-gray-200 rounded-lg p-6 grid grid-cols-[auto_auto_400px] gap-2 min-w-[900px]">
              <div>
                <h2 className="text-lg font-semibold px-4">Eyeglasses</h2>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    All Glasses
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>

                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-105">Men</span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>

                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    Women
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">Kids</span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    Best Seller
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    New Arrival
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    ₹999 Frames
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition ">
                    →
                  </span>
                </Link>
              </div>
              <div>
                <h2 className="text-lg font-semibold px-4 mb-2">
                  Shop By Lens Type
                </h2>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    Blue Light
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    Progressive
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    Anti-Fatigue
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    Light-Responsive
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    See All Lens Option
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
              </div>
              <div className="flex flex-row items-center gap-8">
                <div className="relative w-full max-w-[200px] h-64 rounded overflow-hidden">
                  <img
                    src={menImg}
                    alt="Shop for Men"
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 ... rounded-xl ring-2 ring-gray-300 hover:ring-gray-500 hove:bg-amber-100 bg-white p-2 text-xs h-6 py-1">
                    Shop Men
                  </button>
                </div>

                <div className="relative w-full max-w-[200px] h-64 rounded overflow-hidden">
                  <img
                    src={womenImg}
                    alt="Shop for Men"
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 ... rounded-xl ring-2 ring-gray-300 hover:ring-gray-500 hover:bg-gray-200 bg-white p-2 text-xs  h-6 py-1">
                    Shop Women
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sunglasses */}
        <div
          onMouseEnter={() => handleMouseEnter("sunglasses")}
          onMouseLeave={handleMouseLeave}
          className="relative transition duration-200 ease-in-out"
        >
          <button
            onClick={() =>
              setOpenMenu(openMenu === "sunglasses" ? null : "sunglasses")
            }
            className="hover:underline"
          >
            Sunglasses
          </button>
          {openMenu === "sunglasses" && (
            <div className="fixed left-1/2 -translate-x-1/2  mt-5 bg-white shadow-xl ring-1 ring-gray-200 rounded-lg p-6 grid grid-cols-[auto_auto_400px] gap-2 min-w-[900px]">
              <div>
                <h2 className="text-lg font-semibold px-4">Eyeglasses</h2>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    All Glasses
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>

                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-105">Men</span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>

                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    Women
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">Kids</span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    Best Seller
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    New Arrival
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    ₹999 Frames
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition ">
                    →
                  </span>
                </Link>
              </div>
              <div>
                <h2 className="text-lg font-semibold px-4 mb-2">
                  Shop By Lens Type
                </h2>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    Prescription
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    Progressive
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    Non-priscription
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    Polarized
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    Clip-Ons
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
                <Link
                  to="/eyeglasses/women"
                  className="group flex items-center gap-1 px-4 py-1  text-sm"
                >
                  <span className="transition group-hover:scale-110">
                    See All Lens Option
                  </span>
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    →
                  </span>
                </Link>
              </div>
              <div className="flex flex-row items-center gap-8">
                <div className="relative w-full max-w-[200px] h-64 rounded overflow-hidden">
                  <img
                    src={sunmenImg}
                    alt="Shop for Men"
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 ... rounded-xl ring-2 ring-gray-300 hover:ring-gray-500 hove:bg-amber-100 bg-white p-2 text-xs h-6 py-1">
                    Shop Men
                  </button>
                </div>

                <div className="relative w-full max-w-[200px] h-64 rounded overflow-hidden">
                  <img
                    src={sunwomenImg}
                    alt="Shop for Men"
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 ... rounded-xl ring-2 ring-gray-300 hover:ring-gray-500 hover:bg-gray-200 bg-white p-2 text-xs  h-6 py-1">
                    Shop Women
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accessories */}
        <div>
          <Link to="/quiz" className="hover:underline">
            Accessories
          </Link>
        </div>
        {/* Take Quiz */}
        <div>
          <Link to="/quiz" className="hover:underline">
            Take Quiz
          </Link>
        </div>

        {/* Offers */}
        <div>
          <Link to="/offers" className="hover:underline">
            Offers
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button>
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
        <button>
          <HeartIcon className="w-5 h-5 hover:text-red-500 transition-colors duration-200" />
        </button>
        <button className="relative">
          <ShoppingCartIcon className="w-5 h-5" />
          <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
            1
          </span>
        </button>
        {!isAuthenticated ? (
          <Link
            to="/Login"
            className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-full hover:border-black transition"
          >
            <UserIcon className="w-4 h-4" />
            <span className="text-sm">Login</span>
          </Link>
        ) : (
          <Link
            to="/profile"
            className="flex items-center gap-2 px-1 py-1 border border-gray-300 rounded-full hover:border-black transition focus:outline-none"
          >
            <img
              src={user?.avtar || "https://via.placeholder.com/32"}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover border border-gray-300"
            />
          </Link>
        )}
      </div>
    </nav>
  );
}
