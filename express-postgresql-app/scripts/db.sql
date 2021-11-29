
SELECT 'CREATE DATABASE cnainventory' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'cnainventory')\gexec

--\connect cnainventory

EXEC SQL SET CONNECTION TO cnainventory;

CREATE TABLE IF NOT EXISTS inventory (
    id serial PRIMARY KEY, 
    name VARCHAR(50), 
    quantity INTEGER,
    date DATE NOT NULL DEFAULT NOW()::date
);

INSERT INTO inventory (id, name, quantity) VALUES (1, 'yogurt', 200) ON CONFLICT DO NOTHING;
INSERT INTO inventory (id, name, quantity) VALUES (2, 'milk', 100) ON CONFLICT DO NOTHING;
INSERT INTO inventory (id, name, quantity) VALUES (3, 'spinach', 400) ON CONFLICT DO NOTHING;
INSERT INTO inventory (id, name, quantity) VALUES (4, 'carrots', 100) ON CONFLICT DO NOTHING;
