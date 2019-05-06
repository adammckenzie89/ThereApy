select p.content, p.postid,  f."favoritesID" from posts p
join favorites f
on p.favoritesid = f."favoritesID"
