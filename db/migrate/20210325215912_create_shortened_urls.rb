class CreateShortenedUrls < ActiveRecord::Migration[6.0]
  def change
    create_table :shortened_urls, id: :uuid do |t|
      t.string :original_url
      t.string :token

      t.timestamps
    end
  end
end
