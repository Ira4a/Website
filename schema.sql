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
