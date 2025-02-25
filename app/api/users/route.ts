import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/app/lib/mongodb";
import User from "@/app/models/User";

// Connect to the database
await connectDb();

/** 
 * GET: Fetch all users
 * URL: /api/users
 */
export async function GET() {
  try {
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

/** 
 * POST: Create a new user
 * URL: /api/users
 */
export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role, isActive = true } = await req.json();

    // Validate input
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newUser = new User({ name, email, password, role, isActive });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

/** 
 * PATCH: Toggle a user's active status
 * URL: /api/users/toggle
 * Body: { id, isActive }
 */
export async function PATCH(req: NextRequest) {
  try {
    const { id, isActive } = await req.json();

    if (!id || typeof isActive !== "boolean") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User status updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error toggling user status:", error);
    return NextResponse.json({ error: "Failed to toggle user status" }, { status: 500 });
  }
}

/** 
 * PUT: Edit an existing user
 * URL: /api/users
 * Body: { id, name, email, role }
 */
export async function PUT(req: NextRequest) {
  try {
    const { id, name, email, role } = await req.json();

    if (!id || !name || !email || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error editing user:", error);
    return NextResponse.json({ error: "Failed to edit user" }, { status: 500 });
  }
}

/** 
 * DELETE: Delete a user by ID
 * URL: /api/users
 * Body: { id }
 */
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
