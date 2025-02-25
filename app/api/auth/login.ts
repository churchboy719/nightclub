// import { NextApiRequest, NextApiResponse } from "next";
// import { sanityClient } from "@/sanity/lib/sanity";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken"; // Optional, for token generation

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required" });
//   }

//   try {
//     // Fetch the user by username
//     const query = `*[_type == "cashiers" && username == $username][0]`;
//     const user = await sanityClient.fetch(query, { username });

//     if (!user) {
//       return res.status(404).json({ message: "Invalid username or password" });
//     }

//     // Check the password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }

//     // Optional: Generate a JWT token (or use NextAuth.js for session management)
//     const token = jwt.sign(
//       { id: user._id, username: user.username, role: user.role },
//       process.env.NEXTAUTH_SECRET || "defaultsecret",
//       { expiresIn: "1h" }
//     );

//     return res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }
