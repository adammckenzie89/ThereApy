select p.content, p.username, p.time, p.postid, f."address", p.favoritesid, f.id from posts p
join favorites f
on p.favoritesid = f."favoritesID";
