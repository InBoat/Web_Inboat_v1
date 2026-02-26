-- InBoat Seed Data
-- Sample data for development and testing

-- Insert sample users
INSERT INTO users (email, full_name, phone, role) VALUES
  ('admin@inboat.com', 'Administrador InBoat', '+55 11 98765-4321', 'admin'),
  ('joao.silva@email.com', 'João Silva', '+55 11 91234-5678', 'shareholder'),
  ('maria.santos@email.com', 'Maria Santos', '+55 21 92345-6789', 'shareholder'),
  ('pedro.costa@email.com', 'Pedro Costa', '+55 11 93456-7890', 'shareholder')
ON CONFLICT (email) DO NOTHING;

-- Insert sample boats
INSERT INTO boats (name, model, manufacturer, year, length_meters, capacity, location, description, specifications, total_shares, available_shares, price_per_share, monthly_maintenance_fee, images) VALUES
  (
    'Azimut 55',
    'Azimut 55 Fly',
    'Azimut Yachts',
    2022,
    16.80,
    12,
    'Marina da Glória - Rio de Janeiro',
    'Iate de luxo com 3 cabines, flybridge espaçoso e acabamento premium. Perfeito para passeios em família ou eventos corporativos.',
    '{"engine": "2x Volvo Penta D11-670", "fuel": "Diesel", "cruising_speed": "28 nós", "max_speed": "32 nós", "fuel_capacity": "2000L", "water_capacity": "600L"}'::jsonb,
    12,
    8,
    250000.00,
    8500.00,
    '["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=600&width=800&query=luxury+yacht+azimut+exterior", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=600&width=800&query=luxury+yacht+interior+cabin", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=600&width=800&query=yacht+flybridge+deck"]'::jsonb
  ),
  (
    'Intermarine 60',
    'Intermarine 60 Full',
    'Intermarine',
    2021,
    18.50,
    15,
    'Iate Clube de Santos - São Paulo',
    'Lancha esportiva brasileira com design arrojado, 4 cabines e excelente desempenho. Ideal para navegação costeira e viagens de fim de semana.',
    '{"engine": "3x Volvo Penta D13-900", "fuel": "Diesel", "cruising_speed": "32 nós", "max_speed": "38 nós", "fuel_capacity": "3000L", "water_capacity": "800L"}'::jsonb,
    12,
    10,
    320000.00,
    10500.00,
    '["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=600&width=800&query=intermarine+yacht+exterior", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=600&width=800&query=luxury+boat+interior", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=600&width=800&query=yacht+cockpit+deck"]'::jsonb
  ),
  (
    'Ferretti 450',
    'Ferretti Yachts 450',
    'Ferretti',
    2023,
    13.80,
    10,
    'Marina Itajaí - Santa Catarina',
    'Iate italiano elegante com 2 cabines, design sofisticado e tecnologia de ponta. Perfeito para quem busca conforto e estilo.',
    '{"engine": "2x Volvo Penta D6-400", "fuel": "Diesel", "cruising_speed": "24 nós", "max_speed": "30 nós", "fuel_capacity": "1500L", "water_capacity": "400L"}'::jsonb,
    12,
    12,
    180000.00,
    6500.00,
    '["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=600&width=800&query=ferretti+yacht+exterior", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=600&width=800&query=yacht+luxury+salon", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=600&width=800&query=yacht+master+cabin"]'::jsonb
  );

-- Insert sample shareholders
INSERT INTO shareholders (user_id, boat_id, shares_owned, purchase_date)
SELECT 
  u.id,
  b.id,
  2,
  '2024-01-15'
FROM users u, boats b
WHERE u.email = 'joao.silva@email.com' AND b.name = 'Azimut 55';

INSERT INTO shareholders (user_id, boat_id, shares_owned, purchase_date)
SELECT 
  u.id,
  b.id,
  1,
  '2024-02-20'
FROM users u, boats b
WHERE u.email = 'maria.santos@email.com' AND b.name = 'Azimut 55';

INSERT INTO shareholders (user_id, boat_id, shares_owned, purchase_date)
SELECT 
  u.id,
  b.id,
  1,
  '2024-03-10'
FROM users u, boats b
WHERE u.email = 'pedro.costa@email.com' AND b.name = 'Intermarine 60';

-- Update available shares
UPDATE boats SET available_shares = 8 WHERE name = 'Azimut 55';
UPDATE boats SET available_shares = 11 WHERE name = 'Intermarine 60';

-- Insert sample bookings
INSERT INTO bookings (boat_id, shareholder_id, start_date, end_date, guests_count, notes)
SELECT 
  b.id,
  s.id,
  '2025-01-20',
  '2025-01-22',
  6,
  'Passeio em família para Angra dos Reis'
FROM boats b
JOIN shareholders s ON s.boat_id = b.id
JOIN users u ON s.user_id = u.id
WHERE b.name = 'Azimut 55' AND u.email = 'joao.silva@email.com';

INSERT INTO bookings (boat_id, shareholder_id, start_date, end_date, guests_count, notes)
SELECT 
  b.id,
  s.id,
  '2025-02-14',
  '2025-02-16',
  4,
  'Fim de semana romântico'
FROM boats b
JOIN shareholders s ON s.boat_id = b.id
JOIN users u ON s.user_id = u.id
WHERE b.name = 'Azimut 55' AND u.email = 'maria.santos@email.com';

-- Insert sample maintenance reports
INSERT INTO maintenance_reports (boat_id, reported_by, title, description, priority, status, cost)
SELECT 
  b.id,
  u.id,
  'Revisão de Motor',
  'Revisão preventiva dos motores conforme manual do fabricante. Troca de óleo e filtros.',
  'medium',
  'completed',
  4500.00
FROM boats b, users u
WHERE b.name = 'Azimut 55' AND u.role = 'admin';

INSERT INTO maintenance_reports (boat_id, reported_by, title, description, priority, status)
SELECT 
  b.id,
  u.id,
  'Limpeza e Polimento',
  'Limpeza completa do casco e polimento do gelcoat.',
  'low',
  'pending'
FROM boats b, users u
WHERE b.name = 'Intermarine 60' AND u.role = 'admin';

-- Insert sample invoices
INSERT INTO invoices (shareholder_id, invoice_number, invoice_type, amount, due_date, status, description)
SELECT 
  s.id,
  'INV-2025-001',
  'monthly_fee',
  8500.00,
  '2025-01-10',
  'paid',
  'Taxa de manutenção mensal - Janeiro 2025'
FROM shareholders s
JOIN users u ON s.user_id = u.id
WHERE u.email = 'joao.silva@email.com';

INSERT INTO invoices (shareholder_id, invoice_number, invoice_type, amount, due_date, status, description)
SELECT 
  s.id,
  'INV-2025-002',
  'monthly_fee',
  8500.00,
  '2025-02-10',
  'pending',
  'Taxa de manutenção mensal - Fevereiro 2025'
FROM shareholders s
JOIN users u ON s.user_id = u.id
WHERE u.email = 'joao.silva@email.com';
