class ShortenedUrl < ApplicationRecord
  include ActiveModel::Validations

  before_validation :set_token, on: :create

  validates :original_url, presence: true, url: { allow_blank: true }

  validates :token, presence: true, uniqueness: true

  def short_url
    "#{ENV['APP_URL']}/#{token}"
  end

  def last_hour_activity_by_minute
    result = EventRepository.new().search({
      query: {
        bool: {
          filter: [
            {
              range: {
                created_at: {
                  gte: 'now-1h',
                  lte: 'now'
                }
              }
            },
            {
              term: {
                shortened_url_token: token
              }
            }
          ]
        }
      },
      aggs: {
        events: {
          date_histogram: {
            field: 'created_at',
            calendar_interval: 'minute'
          }
        }
      }
    })

    buckets = result.raw_response['aggregations']['events']['buckets']
    dates = buckets.map do |bucket|
      DateTime.parse(bucket['key_as_string']).strftime('%F %T')
    end
    counts = buckets.map {|bucket| bucket['doc_count']}
    return dates, counts
  end

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
