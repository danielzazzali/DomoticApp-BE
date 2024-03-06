INSERT INTO lights (id, key, name, is_on, mode, brightness, color_temperature)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;
