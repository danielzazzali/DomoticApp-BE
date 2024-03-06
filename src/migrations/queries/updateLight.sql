UPDATE lights
SET key = $2, name = $3, is_on = $4, mode = $5, brightness = $6, color_temperature = $7
WHERE id = $1
RETURNING *;
