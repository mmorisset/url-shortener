FactoryBot.define do
  factory :shortened_url, class: ShortenedUrl do
    original_url { Faker::Internet.url }
  end
end
