class ShortenedUrl < ApplicationRecord
  include ActiveModel::Validations

  before_validation :set_token, on: :create

  validates :original_url, presence: true, url: { allow_blank: true }

  validates :token, presence: true, uniqueness: true

  protected

  def set_token
    self.token = generate_token
  end

  def generate_token
    loop do
      token = SecureRandom.hex(6)
      break token unless ShortenedUrl.where(token: token).exists?
    end
  end
end
