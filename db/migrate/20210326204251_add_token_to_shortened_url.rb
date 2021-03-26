class AddTokenToShortenedUrl < ActiveRecord::Migration[6.0]
  def change
    add_column :shortened_urls, :token, :string
  end
end
