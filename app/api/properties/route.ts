import connectDB from "@/config/database";
import Property, { PropertyClass } from "@/models/Property";

// GET /api/properties
export const GET = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "9");
  const page = url.searchParams.get("page") || "1";
  try {
    await connectDB();
    const properties: PropertyClass[] = await Property.find().sort({ createdAt: -1 }).limit(pageSize);

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