"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useMenu } from "../state/menuState";
import { FaPlus, FaMinus } from "react-icons/fa";
import Navbar from "./Navbar";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export default function Cart() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [tableNumber, setTableNumber] = useState("");

  useEffect(() => {
    // Initialize the socket connection on the client
    socket = io("http://localhost:3001");

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);

  const addItems = (menu: any) => {
    const checkItem = cartItems.find((item: any) => item._id === menu._id);
    if (checkItem) {
      setCartItems(
        cartItems.map((item: any) =>
          item._id === menu._id ? { ...checkItem, qty: checkItem.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...menu, qty: 1 }]);
    }
  };

  const removeItem = (menu: any) => {
    const checkItem = cartItems.find((item: any) => item._id === menu._id);
    if (checkItem.qty === 1) {
      setCartItems(cartItems.filter((item) => item._id !== menu._id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item._id === menu._id ? { ...checkItem, qty: checkItem.qty - 1 } : item
        )
      );
    }
  };

  const handleSendOrder = () => {
    if (!tableNumber.trim()) {
      alert("Please enter a table number before placing an order.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      return;
    }

    const orderData = {
      tableNumber,
      orders: cartItems,
    };

    socket.emit("orders", orderData); // Emit the order data to the server
    setCartItems([]);
    setTableNumber("");
    alert("Your order has been placed.");
  };

  const { data: menus, isLoading, isError } = useMenu();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error fetching menu</h1>;

  const totalAmount = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-slate-100 flex-col items-center p-6 sm:p-10">
        <input
          type="text"
          placeholder="Table Number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="border p-2 rounded mb-4"
        />
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {menus?.map((menu: any) => (
                <div
                  key={menu._id}
                  className="card h-full bg-white w-full shadow-sm p-3 rounded-md bg-clip-padding backdrop-blur-lg backdrop-filter"
                >
                  <div className="relative">
                    {menu.images && menu.images[0] ? (
                      <Image
                        src={urlFor(menu.images[0]).url()}
                        alt={menu.product}
                        width={100}
                        height={100}
                        className="object-cover w-full h-32 sm:h-40"
                      />
                    ) : (
                      <div>No Image Available</div>
                    )}
                    <div className="absolute top-2 right-2">
                      <div className="relative bg-red-500 cursor-pointer p-3 rounded-full">
                        <FaPlus
                          className="text-white text-xl font-medium z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          onClick={() => addItems(menu)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-data pt-3">
                    <div className="flex items-center text-black justify-between">
                      <div className="font-medium">{menu.product}</div>
                      <div className="font-medium text-red-500">N{menu.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white shadow-sm p-3 lg:col-span-2 rounded-md">
              {cartItems.map((menu: any) => (
                <div
                  key={menu._id}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="text-black font-medium">{menu.product}</div>
                  <div className="flex space-x-4 items-center">
                    <div className="relative bg-red-500 cursor-pointer p-2 rounded-full text-white shadow-sm">
                      <FaPlus
                        className="text-white text-sm sm:text-xl font-medium"
                        onClick={() => addItems(menu)}
                      />
                    </div>
                    <span className="text-sm sm:text-xl px-3 py-2 bg-gray-100 text-black">
                      {menu.qty}
                    </span>
                    <div className="relative bg-red-500 cursor-pointer p-2 rounded-full text-white shadow-sm">
                      <FaMinus
                        className="text-white text-sm sm:text-xl font-medium"
                        onClick={() => removeItem(menu)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center text-black justify-between mb-3">
                <div className="text-sm sm:text-lg font-medium">Total</div>
                <div className="text-sm sm:text-lg font-medium">N{totalAmount}</div>
              </div>
              <button
                className="text-white w-full bg-red-500 p-3 rounded-md"
                onClick={handleSendOrder}
              >
                Send Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
