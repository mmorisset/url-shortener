class ShortenedUrl < ApplicationRecord
  include ActiveModel::Validations

  validates :original_url, presence: true, url: { allow_blank: true }
end
