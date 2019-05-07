select p.content, p.postid ,f."address", p.favoritesid from posts p
join favorites f
on p.favoritesid = f."favoritesID"
