function gravity(dt, sprite)
{
	sprite.y += dt;
	if (sprite.y + sprite.height > Micro.height)
		sprite.y = Micro.height - sprite.height
}
