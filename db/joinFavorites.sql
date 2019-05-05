select f.img, f.name, f.address, f.number, f.website, f.rating, u.username
from favorites f
join users u
on f.id = u.id;


