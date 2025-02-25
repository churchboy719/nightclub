import { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "@/app/lib/mongodb";
import User from "@/app/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDb();

  if (req.method === "PATCH") {
    const { id } = req.query;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isActive = !user.isActive;
    await user.save();
    return res.status(200).json(user);
  }

  res.setHeader("Allow", ["PATCH"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
