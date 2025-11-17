import { getRecentTransactions } from "@/lib/database"

export async function GET() {
  try {
    const transactions = await getRecentTransactions(10)
    return Response.json(transactions)
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return Response.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}
