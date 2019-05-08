UPDATE users SET
username = $2,
email = $3
WHERE username = $1;

SELECT * FROM users;