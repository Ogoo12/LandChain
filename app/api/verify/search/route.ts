import { createClient } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return Response.json([])
  }

  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .or(
        `owner_name.ilike.%${query}%,location.ilike.%${query}%,id.ilike.%${query}%`
      )
      .limit(20)

    if (error) {
      throw error
    }

    return Response.json(data || [])
  } catch (error) {
    console.error("Error searching properties:", error)
    return Response.json({ error: "Failed to search properties" }, { status: 500 })
  }
}
