CREATE TABLE shows (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    year INT,
    genre VARCHAR(100),
    country VARCHAR(50),
    description TEXT
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    show_id INT REFERENCES shows(id) ON DELETE CASCADE,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO shows (title, year, genre, country, description)
VALUES 
('Crash Landing on You', 2019, 'Romance', 'Korea', 'Love story between South Korean heiress and North Korean officer'),
('Attack on Titan', 2013, 'Action', 'Japan', 'Humans vs Titans in post-apocalyptic world'),
('2gether: The Series', 2020, 'Romance', 'Thailand', 'Fake relationship turns real'),
('The Untamed', 2019, 'Fantasy', 'China', 'Magical cultivation story');
