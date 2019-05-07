delete from posts
WHERE favoritesid = $1;
delete from favorites where "favoritesID" = $1;
