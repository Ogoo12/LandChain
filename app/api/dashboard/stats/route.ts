import { getPropertyStats } from "@/lib/database"

export async function GET() {
  try {
    const stats = await getPropertyStats()
    return Response.json(stats)
  } catch (error) {
    console.error("Error fetching stats:", error)
    return Response.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
