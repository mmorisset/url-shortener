FactoryBot.define do
  factory :shortened_url, class: ShortenedUrl do
    original_url { Faker::Internet.url }
  end

  factory :shortened_url_with_activity, parent: :shortened_url do
    after(:create) do |url|
      repository = EventRepository.new()
      (1..10).each do |i|
        event = Event.new(name: 'visited_url', shortened_url_token: url.token, created_at: i.minutes.ago)
        repository.save(event)
      end
    end
  end
end
