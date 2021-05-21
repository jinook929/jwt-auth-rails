# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(username: "abc", password: '123', avatar: Faker::Avatar.image(slug: "profile-pic", size: "50x50"), bio: Faker::TvShows::Friends.quote
)
15.times do
  User.create(
    username: Faker::TvShows::Friends.character, password: 'hi', avatar: Faker::Avatar.image(slug: Faker::TvShows::Friends.character, size: "150x150"), bio: Faker::TvShows::Friends.quote
  )
end
