import { getUserByDiscordId } from "@/src/controllers/user.controller";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
    const { id } = await params;
    if(request.headers.get("x-auth-id") === id){
      
    return getUserByDiscordId(id);
    }
}