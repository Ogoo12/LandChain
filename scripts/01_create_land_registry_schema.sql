-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_name VARCHAR(255) NOT NULL,
  owner_email VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  area_sqft NUMERIC(12, 2) NOT NULL,
  market_value NUMERIC(15, 2),
  description TEXT,
  latitude NUMERIC(10, 8),
  longitude NUMERIC(11, 8),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'transferred')),
  registered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  wallet_address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blockchain transactions table
CREATE TABLE IF NOT EXISTS blockchain_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  tx_hash VARCHAR(255) UNIQUE,
  block_number BIGINT,
  transaction_type VARCHAR(50) CHECK (transaction_type IN ('registration', 'verification', 'transfer')),
  from_address VARCHAR(255),
  to_address VARCHAR(255),
  amount NUMERIC(18, 8),
  gas_used BIGINT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents table (for encrypted documents)
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  document_name VARCHAR(255) NOT NULL,
  document_type VARCHAR(100),
  encrypted_data TEXT NOT NULL,
  encryption_algorithm VARCHAR(50) DEFAULT 'AES-256',
  document_hash VARCHAR(255),
  file_size_bytes BIGINT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verification records table
CREATE TABLE IF NOT EXISTS verification_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  verified_by VARCHAR(255),
  verification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verification_method VARCHAR(100),
  immutability_proof VARCHAR(255),
  fraud_risk_score NUMERIC(3, 2) DEFAULT 0.0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_owner_email ON properties(owner_email);
CREATE INDEX IF NOT EXISTS idx_properties_wallet_address ON properties(wallet_address);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_blockchain_transactions_property_id ON blockchain_transactions(property_id);
CREATE INDEX IF NOT EXISTS idx_blockchain_transactions_tx_hash ON blockchain_transactions(tx_hash);
CREATE INDEX IF NOT EXISTS idx_documents_property_id ON documents(property_id);
CREATE INDEX IF NOT EXISTS idx_verification_records_property_id ON verification_records(property_id);

-- Enable RLS (Row Level Security)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE blockchain_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_records ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Enable read access for all users" ON properties
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON properties
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON blockchain_transactions
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON blockchain_transactions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON documents
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON documents
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON verification_records
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON verification_records
  FOR INSERT WITH CHECK (true);
