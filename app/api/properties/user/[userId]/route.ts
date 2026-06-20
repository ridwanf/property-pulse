import connectDB from "@/config/database";
import Property, { PropertyClass } from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextRequest } from "next/server";

// GET /api/properties/user/:userId
export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }): Promise<Response> => {
  try {
    await connectDB();
    const { userId } = await params
    if (!userId) {
      return new Response("User ID is required", {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const properties: PropertyClass[] = await Property.find({ owner: userId }).lean();
    return new Response(JSON.stringify(properties), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// POST /api/properties
export const POST = async (request: Request): Promise<Response> => {
  try {
    const body = await request.json();
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const newProperty = await Property.create(body);
    return new Response(JSON.stringify(newProperty), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}