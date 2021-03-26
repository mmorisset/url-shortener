class ShortenedUrl < ApplicationRecord
  include ActiveModel::Validations

  validates :original_url, presence: true, url: true
end
