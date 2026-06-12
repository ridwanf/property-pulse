import connectDB from "@/config/database";
import Property, { PropertyClass } from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/properties/:id
export const GET = async (request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> => {
  const { id } = await context.params;

  try {
    console.log("Handling GET request for property ID:", id);

    await connectDB();
    const property: PropertyClass | null = await Property.findById(id);
    console.log("Fetched property:", property);
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

export const DELETE = async (request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> => {
  const { id } = await context.params;

  try {

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    console.log("Handling DELETE request for property ID:", id);

    await connectDB();
    const deletedProperty = await Property.findById(id);
    console.log("Deleted property:", deletedProperty);
    if (!deletedProperty) {
      return new Response("Property not found", {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // verify ownership
    if (deletedProperty.owner.toString() !== sessionUser.userId) {
      return new Response("Forbidden: You do not have permission to delete this property", {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    await deletedProperty.deleteOne();

    return new Response(JSON.stringify({ message: "Property deleted successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}