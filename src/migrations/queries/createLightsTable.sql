CREATE TABLE lights (
    id VARCHAR(255) PRIMARY KEY,
    key VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL UNIQUE,
    is_on BOOLEAN NOT NULL DEFAULT false,
    mode VARCHAR(50) NOT NULL DEFAULT 'white',
    brightness INTEGER NOT NULL CHECK (brightness BETWEEN 10 AND 1000),
    color_temperature INTEGER NOT NULL CHECK (color_temperature BETWEEN 10 AND 1000)
); 