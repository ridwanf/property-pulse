import connectDB from "@/config/database";
import Property, { PropertyClass } from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/properties/:id
export const GET = async (request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> => {
  const { id } = await context.params;

  try {
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

export const PUT = async (request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> => {
  try {
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
    const { userId } = sessionUser;
    const { id } = await context.params;
    console.log("ID:", id);
    const formData = await request.formData();

    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return new Response('Property does not exist', { status: 404 });
    }

    // Verify ownership
    if (existingProperty.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Create propertyData object for database
    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities: formData.getAll('amenities'),
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly.'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
    };

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData, { new: true });
    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
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