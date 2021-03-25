Given('I fill the Original URL field with {string}') do |url|
  fill_in 'shortened_url_original_url', with: url
end

Then('a new shorten url should be created') do
  expect(ShortenedUrl.count).to eq(1)
  @shortened_url = ShortenedUrl.first
end
