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
INSERT INTO inventory (id, name, quantity) VALUES (5, 'cucumber', 100) ON CONFLICT DO NOTHING;
INSERT INTO inventory (id, name, quantity) VALUES (6, 'rock', 100) ON CONFLICT DO NOTHING;
