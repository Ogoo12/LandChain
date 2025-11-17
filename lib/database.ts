import { createClient } from "./supabase";

export interface Property {
  id: string;
  owner_name: string;
  owner_email: string | null;
  location: string;
  area_sqft: number;
  market_value: number | null;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  status: "pending" | "verified" | "transferred";
  registered_date: string;
  updated_date: string;
  wallet_address: string | null;
  created_at: string;
}

export interface BlockchainTransaction {
  id: string;
  property_id: string;
  tx_hash: string | null;
  block_number: number | null;
  transaction_type: "registration" | "verification" | "transfer";
  from_address: string | null;
  to_address: string | null;
  amount: number | null;
  gas_used: number | null;
  timestamp: string;
  status: "pending" | "confirmed" | "failed";
  created_at: string;
}

export async function getProperties(limit?: number) {
  const supabase = await createClient();
  
  let query = supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
  
  return data as Property[];
}

export async function getPropertyById(id: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching property:", error);
    return null;
  }

  return data as Property;
}

export async function getPropertyTransactions(propertyId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("blockchain_transactions")
    .select("*")
    .eq("property_id", propertyId)
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }

  return data as BlockchainTransaction[];
}

export async function getRecentTransactions(limit: number = 10) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("blockchain_transactions")
    .select("*, properties(owner_name, location)")
    .order("timestamp", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching recent transactions:", error);
    return [];
  }

  return data;
}

export async function createProperty(property: Omit<Property, 'id' | 'created_at' | 'updated_date'>) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("properties")
    .insert([property])
    .select()
    .single();

  if (error) {
    console.error("Error creating property:", error);
    return null;
  }

  return data as Property;
}

export async function updateProperty(id: string, updates: Partial<Property>) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("properties")
    .update({ ...updates, updated_date: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating property:", error);
    return null;
  }

  return data as Property;
}

export async function getPropertyStats() {
  const supabase = await createClient();
  
  const { data: allProperties } = await supabase
    .from("properties")
    .select("*");

  const totalProperties = allProperties?.length || 0;
  const verifiedRecords = allProperties?.filter(p => p.status === 'verified').length || 0;
  const pendingVerification = allProperties?.filter(p => p.status === 'pending').length || 0;
  const totalValue = allProperties?.reduce((sum: number, p: Property) => sum + (p.market_value || 0), 0) || 0;

  return {
    totalProperties,
    verifiedRecords,
    pendingVerification,
    totalValue,
  };
}
