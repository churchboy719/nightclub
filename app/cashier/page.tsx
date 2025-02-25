"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


//const newSocket = io("http://localhost:3001");

type Order = {
  tableNumber: string;
  orders: { product: string; qty: number }[];
};

type Message = {
  message: string;
  username: string;
  type: "cashier" | "customer" | "order" | "sales";
};

export default function Cashier() {
  const router = useRouter();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      return; // Wait until authentication status is determined
    }
  
    if (status === "unauthenticated") {
      // Redirect unauthenticated users to the sign-in page
      router.replace("/api/auth/signin");
      return;
    }
  
    if (status === "authenticated" && session?.user.role !== "Cashier") {
      // Redirect users without the "Cashier" role to the unauthorized page
      router.replace("/api/auth/signin");
    }
  }, [status, session, router]);




  useEffect(() => {

    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    newSocket.on("orders", (orderData: Order) => {
      console.log("Order received:", orderData);
      const orderMessage: Message = {
        message: `Order from Table #${orderData.tableNumber}: ${orderData.orders
          .map((o) => `${o.product} x ${o.qty}`)
          .join(", ")}`,
        username: "System",
        type: "order",
      };
      setChatMessages((prevMessages) => [...prevMessages, orderMessage]);
    });

    newSocket.on("chatMessage", (msg: string) => {
      console.log("Customer message received:", msg);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { message: msg, username: "Customer", type: "customer" },
      ]);
    });

    newSocket.on("cashierMessage", (msg: string) => {
      console.log("Cashier message received:", msg);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { message: msg, username: "Cashier", type: "cashier" },
      ]);
    });

    newSocket.on("cashierGroup", (data) => {
      console.log("Cashier group update received:", data);
           const salesMessage: Message = {
             message: `Sales update from ${data.username}: Total Sales: N${data.totalSales}`,
             username: data.username,
             type: "sales",
           };
           setChatMessages((prevMessages) => [...prevMessages, salesMessage]);
         });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const cashierMessage: Message = {
        message,
        username: "Cashier",
        type: "cashier",
      };
      socket.emit("cashierMessage", cashierMessage);
      setChatMessages((prevMessages) => [...prevMessages, cashierMessage]);
      setMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-2xl font-bold">Cashier Dashboard</h1>
        <Link href="/invoice" className="bg-blue-500 text-white px-4 py-2 rounded">
          Invoice
        </Link>
        </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
  {chatMessages.length > 0 ? (
    chatMessages.map((msg, idx) => {
      try {
        if (
          typeof msg.message !== "string" ||
          typeof msg.username !== "string" ||
          typeof msg.type !== "string"
        ) {
          throw new Error("Invalid message format");
        }

        let bgColor = "bg-gray-200";
        let textColor = "text-black";
        let alignment = "justify-start";

        switch (msg.type) {
          case "cashier":
            bgColor = "bg-blue-500";
            textColor = "text-white";
            alignment = "justify-end";
            break;
          case "customer":
            bgColor = "bg-gray-300";
            alignment = "justify-start";
            break;
          case "order":
             bgColor = "bg-yellow-400";
            textColor = "text-black";
            alignment = "justify-start";
            break;
          case "sales":
            bgColor = "bg-green-400";
            textColor = "text-black";
            alignment = "justify-start";
            break;
        }

        return (
          <div key={idx} className={`flex ${alignment} mb-2`}>
            <div className={`p-2 rounded-lg shadow-md ${bgColor} ${textColor}`}>
              <strong>{msg.username}: </strong>
              <span>{msg.message}</span>
            </div>
          </div>
        );
      } catch (error) {
        console.error(error);
        return null;
      }
    })
  ) : (
    <p className="text-gray-500">No messages yet.</p>
  )}
</div>

      {/* Input Box */}
      <div className="p-4 bg-gray-800 flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message"
          className="flex-1 border text-gray-50 p-2 rounded"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSendMessage}
        >
          Send Message
        </button>
      </div>
      </div>
  );


}

// {chatMessages.length > 0 ? (
//   chatMessages.map((msg, idx) => {
//     // Validate the message structure
//     if (!msg || !msg.type || !msg.message || !msg.username) {
//       console.error("Invalid message structure:", msg);
//       return null;
//     }

//     // Define default styles
//     let bgColor = "bg-gray-200";
//     let textColor = "text-black";

//     // Determine styling and alignment based on message type
//     switch (msg.type) {
//       case "cashier":
//         bgColor = "bg-blue-500";
//         textColor = "text-white";
//         break;
//       case "customer":
//         bgColor = "bg-gray-300";
//         break;
//       case "order":
//         bgColor = "bg-yellow-400";
//         textColor = "text-black";
//         break;
//       case "sales":
//         bgColor = "bg-green-400";
//         textColor = "text-black";
//         break;}
      
//     return (
//       <div
//         key={idx}
//         className={`flex ${
//           msg.type === "cashier" ? "justify-end" : "justify-start"
//         } mb-2`}
//       >
//         <div className={`p-2 rounded-lg shadow-md ${bgColor} ${textColor}`}>
//           <strong>{msg.username}: </strong>
//           {msg.message}
//         </div>
//       </div>
//     );
    
// })
// ) : (
//   <p className="text-gray-500">No messages yet.</p>
// )}