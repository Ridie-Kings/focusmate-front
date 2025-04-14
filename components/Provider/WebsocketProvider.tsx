// "use client";
// import { createContext, useState, useEffect } from "react";
// import { io, Socket } from "socket.io-client";

// type SocketIOContextType = {
//   message: string;
//   sendMessage: ((data: any) => void) | undefined;
// };

// export const SocketIOContext = createContext<SocketIOContextType>({
//   message: "",
//   sendMessage: undefined,
// });

// export const SocketIOProvider: React.FC<{
//   children: React.ReactNode;
//   token: string;
// }> = ({ children, token }) => {
//   const [message, setMessage] = useState("");
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [sendMessage, setSendMessage] = useState<
//     ((data: any) => void) | undefined
//   >(undefined);

//   useEffect(() => {
//     if (token) {
//       const socketInstance = io("wss://sherp-app.com", {
//         path: "/api/socket.io",
//         auth: {
//           token,
//         },
//         reconnectionAttempts: 5,
//         reconnectionDelay: 1000,
//         timeout: 20000,
//       });

//       socketInstance.on("connect", () => {
//         // console.log("Socket.IO connection established");

//         setSendMessage(() => (data: any) => {
//           socketInstance.emit("message", data);
//         });
//       });

//       socketInstance.on("message", (data: string) => {
//         setMessage(data);
//       });

//       socketInstance.on("connect_error", (error: Error) => {
//         console.error("Socket.IO connection error:", error);
//       });

//       socketInstance.on("disconnect", (reason: Socket.DisconnectReason) => {
//         // console.log(`Socket.IO disconnected. Reason: ${reason}`);
//         setMessage("");
//       });

//       setSocket(socketInstance);

//       return () => {
//         socketInstance.disconnect();
//         setSocket(null);
//         setSendMessage(undefined);
//       };
//     }
//   }, [token]);

//   return (
//     <SocketIOContext.Provider value={{ message, sendMessage }}>
//       {children}
//     </SocketIOContext.Provider>
//   );
// };
