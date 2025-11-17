-- Create users table to link wallets with user profiles
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  kyc_verified BOOLEAN DEFAULT FALSE,
  kyc_status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
  profile_picture_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wallet_accounts table to track multiple wallets per user
CREATE TABLE IF NOT EXISTS wallet_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  wallet_address VARCHAR(255) UNIQUE NOT NULL,
  chain_id INTEGER, -- Network ID (1 for Ethereum, 11155111 for Sepolia, etc.)
  wallet_type VARCHAR(50), -- metamask, walletconnect, ledger, etc.
  balance NUMERIC(36, 18) DEFAULT 0, -- Balance in wei/smallest unit
  is_primary BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wallet_transactions table to track all wallet interactions
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  wallet_address VARCHAR(255) NOT NULL,
  transaction_hash VARCHAR(255) UNIQUE,
  transaction_type VARCHAR(50), -- send, receive, contract_interaction
  from_address VARCHAR(255),
  to_address VARCHAR(255),
  amount NUMERIC(36, 18),
  gas_fee NUMERIC(36, 18),
  token_symbol VARCHAR(10) DEFAULT 'ETH',
  chain_id INTEGER,
  block_number BIGINT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, failed
  confirmed_at TIMESTAMP WITH TIME ZONE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_properties junction table to link users to their properties
CREATE TABLE IF NOT EXISTS user_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'owner', -- owner, co-owner, authorized_buyer, etc.
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- Update properties table to include owner_wallet_address
ALTER TABLE properties ADD COLUMN IF NOT EXISTS owner_wallet_address VARCHAR(255);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS transaction_count INTEGER DEFAULT 0;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_wallet_address ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_user_wallet_accounts ON wallet_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user ON wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_hash ON wallet_transactions(transaction_hash);
CREATE INDEX IF NOT EXISTS idx_user_properties_user ON user_properties(user_id);
CREATE INDEX IF NOT EXISTS idx_user_properties_property ON user_properties(property_id);

-- Enable RLS on new tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_properties ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (true);

-- Create RLS policies for wallet_accounts table
CREATE POLICY "Users can view wallet accounts" ON wallet_accounts
  FOR SELECT USING (true);

CREATE POLICY "Users can manage wallet accounts" ON wallet_accounts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update wallet accounts" ON wallet_accounts
  FOR UPDATE USING (true);

-- Create RLS policies for wallet_transactions table
CREATE POLICY "Users can view transactions" ON wallet_transactions
  FOR SELECT USING (true);

CREATE POLICY "Users can insert transactions" ON wallet_transactions
  FOR INSERT WITH CHECK (true);
