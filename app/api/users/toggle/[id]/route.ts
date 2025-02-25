import { NextResponse } from "next/server";
import User from "@/app/models/User";
import { connectDb } from "@/app/lib/mongodb";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await connectDb();

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Toggle isActive status
    user.isActive = !user.isActive;
    await user.save();

    return NextResponse.json({ isActive: user.isActive }, { status: 200 });
  } catch (error) {
    console.error("Error toggling user:", error);
    return NextResponse.json({ error: "Failed to toggle user status" }, { status: 500 });
  }
}
