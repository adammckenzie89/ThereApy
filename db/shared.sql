SELECT posts.content, users.username FROM posts
JOIN favorites on favorites."favoritesID" = posts."favoritesid"
JOIN users on favorites.id = users.id
WHERE favorites.address = $1;