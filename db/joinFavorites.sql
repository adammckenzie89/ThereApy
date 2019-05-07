select f.img, f.name, f.address, f.number, f.website, f.rating, u.username, f."favoritesID"
from favorites f
join users u
on f.id = u.id
where u.id = $1;



