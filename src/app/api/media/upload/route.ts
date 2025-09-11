import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/src/lib/cloudinary";
import { requireAuth } from "@/src/lib/middleware/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
     const auth = await requireAuth(req, ["admin"]);
    if (auth instanceof NextResponse) {
      return auth;
    }
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "file alanı boş" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "my-ecommerce",
          resource_type: "image",
        },
        (error: any, result: any) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed", details: err?.message },
      { status: 500 }
    );
  }
}
