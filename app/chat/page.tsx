// "use client"

// import { useState, useEffect } from "react";
// import { io } from 'socket.io-client';
// import Navbar from "../components/Navbar";

// export default function ChatPage () {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState<string[]>([]);
//     const socket = io();
  
//     // useEffect(() => {
//     //   socket.on('message', (msg: string) => {
//     //     setMessages((prevMessages) => [...prevMessages, msg]);
//     //   });
  
//     //   return () => {
//     //     socket.disconnect();
//     //   };
//     // }, [socket]);
  
//     useEffect(() => {
//       const newSocket = io("http://localhost:3001");
    
//       newSocket.on("chatMessage", (msg: string) => {
//         setMessages((prevMessages) => [...prevMessages, msg]);
//       });
    
//       return () => {
//         newSocket.disconnect();
//       };
//     }, []);
    

//     const handleSend = () => {
//       if (message.trim()) {
//         socket.emit('message', message);
//         setMessages((prevMessages) => [...prevMessages, message]);
//         setMessage('');
//       }
//     };
  
//     return (
//       <>
//       <Navbar />
//       <div className="h-screen flex flex-col">
//         <div className="flex-1 overflow-y-auto p-4">
//           {messages.map((msg, index) => (
//             <div key={index} className="bg-gray-200 p-2 rounded mb-2 self-end">
//               {msg}
//             </div>
//           ))}
//         </div>
//         <div className="p-4 bg-gray-800">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="w-full p-2 rounded"
//           />
//           <button
//             onClick={handleSend}
//             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//       </>
//     );
//   };

"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";

// const newSocket = io("http://localhost:3001", {
//   reconnectionAttempts: 3,
//   timeout: 10000,
// });

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {

    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);
      // reconnectionAttempts: 3,
      // timeout: 10000,
  
    
    newSocket.on("chatMessage", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      socket.emit("chatMessage", message);
      setMessages((prev) => [...prev, `You: ${message}`]);
      setMessage("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded mb-2 ${
                msg.startsWith("You:") ? "bg-blue-100 self-end" : "bg-gray-200"
              }`}
            >
              {msg}
            </div>
          ))}
        </div>
        <div className="flex p-4 bg-gray-800">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 rounded-l-md"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
</>
  )};