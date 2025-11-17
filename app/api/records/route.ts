import { getProperties } from "@/lib/database"

export async function GET() {
  try {
    const properties = await getProperties()
    return Response.json(properties)
  } catch (error) {
    console.error("Error fetching records:", error)
    return Response.json({ error: "Failed to fetch records" }, { status: 500 })
  }
}
