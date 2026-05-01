import connectDB from "@/config/database";
import Property, { PropertyClass } from "@/models/Property";

// GET /api/properties/:id
export const GET = async (request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> => {
  const { id } = await context.params;

  try {
    console.log("Handling GET request for property ID:", id);

    await connectDB();
    const property: PropertyClass | null = await Property.findById(id);

    if (!property) {
      return new Response("Property not found", {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(property), {
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