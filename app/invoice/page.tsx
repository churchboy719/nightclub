
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { io } from "socket.io-client";
import { useMenu } from "../state/menuState";
import { FaPlus, FaMinus } from "react-icons/fa";

const socket = io("http://localhost:3001", {
  reconnectionAttempts: 3, // Ensure reconnection on failures
  timeout: 10000, // Set connection timeout
});

export default function InvoicePage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [totalSales, setTotalSales] = useState(0);
  const [username, setUsername] = useState("Cashier1"); // Replace with dynamic username if available

  // Add item to cart
  const addItems = (menu: any) => {
    const updatedCart = [...cartItems];
    const itemIndex = updatedCart.findIndex((item) => item._id === menu._id);
    if (itemIndex > -1) {
      updatedCart[itemIndex].qty++;
    } else {
      updatedCart.push({ ...menu, qty: 1 });
    }
    setCartItems(updatedCart);
  };

  // Remove item from cart
  const removeItem = (menu: any) => {
    const updatedCart = cartItems
      .map((item) =>
        item._id === menu._id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);
    setCartItems(updatedCart);
  };

  const totalAmount = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  // Print Invoice and Update Sales
  const handlePrintInvoice = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty. Please add items.");
      return;
    }

    const aggregatedSales = cartItems.reduce((acc: any[], item: any) => {
      const existing = acc.find((sale) => sale._id === item._id);
      if (existing) {
        existing.qty += item.qty;
        existing.total += item.qty * item.price;
      } else {
        acc.push({ ...item, total: item.qty * item.price });
      }
      return acc;
    }, sales);

    setSales(aggregatedSales);
    setTotalSales(aggregatedSales.reduce((sum, item) => sum + item.total, 0));

    setCartItems([]); // Reset cart after printing
    window.print();
  };

  // Send Sales Data to Cashier Group Chat
  const handleSendSales = () => {
    if (sales.length === 0) {
      alert("No sales data to send.");
      return;
    }

    const salesData = {
      username,
      sales,
      totalSales,
    };
    socket.emit("dailySales", salesData);
  };

  const { data: menus, isLoading, isError } = useMenu();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error fetching menu</h1>;

  return (
    <>
      <div className="flex min-h-screen bg-slate-100 flex-col items-center p-6 sm:p-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Menu Items */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {menus?.map((menu: any) => (
                <div
                  key={menu._id}
                  className="card h-full bg-white w-full shadow-sm p-3 rounded-md"
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
                    <button
                      onClick={() => addItems(menu)}
                      className="absolute top-2 right-2 bg-red-500 p-2 rounded-full text-white"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className="pt-3">
                    <div className="flex justify-between">
                      <span>{menu.product}</span>
                      <span className="text-red-500">N{menu.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart and Sales Column */}
            <div className="lg:col-span-2 flex flex-col space-y-6">
              {/* Cart Section */}
              <div className="bg-white shadow-sm p-3 rounded-md">
                {cartItems.map((menu: any) => (
                  <div
                    key={menu._id}
                    className="flex justify-between mb-4 items-center"
                  >
                    <span>{menu.product}</span>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => addItems(menu)}
                        className="bg-red-500 p-2 rounded-full text-white"
                      >
                        <FaPlus />
                      </button>
                      <span>{menu.qty}</span>
                      <button
                        onClick={() => removeItem(menu)}
                        className="bg-red-500 p-2 rounded-full text-white"
                      >
                        <FaMinus />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <span>Total</span>
                  <span>N{totalAmount}</span>
                </div>
                <button
                  onClick={handlePrintInvoice}
                  className="w-full bg-blue-500 text-white p-3 mt-4 rounded-md"
                >
                  Print Invoice
                </button>
              </div>

              {/* Sales Section */}
              <div className="bg-white shadow-sm p-3 rounded-md">
                <h3 className="text-lg font-medium">Sales</h3>
                {sales.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex justify-between mb-2"
                  >
                    <span>{item.product}</span>
                    <span>{item.qty}x</span>
                    <span>N{item.total}</span>
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <span>Total Sales</span>
                  <span>N{totalSales}</span>
                </div>
                <button
                  onClick={handleSendSales}
                  className="w-full bg-green-500 text-white p-3 mt-4 rounded-md"
                >
                  Send to Group
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
