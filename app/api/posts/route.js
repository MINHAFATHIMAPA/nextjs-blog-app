import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ✅ GET (Read all posts)
export async function GET() {
  const client = await clientPromise;
  const db = client.db("dbblohg");

  const posts = await db.collection("posts").find({}).toArray();

  return Response.json(
    posts.map((p) => ({
      ...p,
      id: p._id.toString(), // convert Mongo _id to string
    }))
  );
}

// ✅ POST (Create new post)
export async function POST(req) {
  try {
    const secret = req.headers.get("x-admin-key");

    if (secret !== process.env.ADMIN_KEY) {
      return Response.json(
        { success: false, error: "Unauthorized ❌" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("dbblohg");

    const result = await db.collection("posts").insertOne(body);

    return Response.json({
      success: true,
      id: result.insertedId.toString(),
    });

  } catch (error) {
    console.error("POST ERROR:", error);
    return Response.json({ success: false, error: error.message });
  }
}

// ✅ DELETE (Delete post)
export async function DELETE(req) {
  try {
    const secret = req.headers.get("x-admin-key");

    if (secret !== process.env.ADMIN_KEY) {
      return Response.json(
        { success: false, error: "Unauthorized ❌" },
        { status: 401 }
      );
    }

    const { id } = await req.json();

    const client = await clientPromise;
    const db = client.db("dbblohg");

    await db.collection("posts").deleteOne({
      _id: new ObjectId(id),
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    return Response.json({ success: false, error: error.message });
  }
}

// ✅ PUT (Update post)
export async function PUT(req) {
  try {
    const secret = req.headers.get("x-admin-key");

    if (secret !== process.env.ADMIN_KEY) {
      return Response.json(
        { success: false, error: "Unauthorized ❌" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, ...updateData } = body;

    const client = await clientPromise;
    const db = client.db("dbblohg");

    await db.collection("posts").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return Response.json({ success: true });

  } catch (error) {
    console.error("PUT ERROR:", error);
    return Response.json({ success: false, error: error.message });
  }
}