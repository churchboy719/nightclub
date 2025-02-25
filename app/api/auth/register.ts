// import { NextApiRequest, NextApiResponse } from "next";
// import { sanityClient } from "@/sanity/lib/sanity";
// import bcrypt from "bcryptjs";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const { username, password, role, status } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required" });
//   }

//   try {
//     const query = `*[_type == "cashiers" && username == $username][0]`;
//     const existingUser = await sanityClient.fetch(query, { username });

//     if (existingUser) {
//       return res.status(409).json({ message: "Username already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = {
//       _type: "cashiers",
//       username,
//       password: hashedPassword,
//       role: role || "user",
//       status: status !== undefined ? status : true,
//     };

//     await sanityClient.create(newUser);

//     return res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }
