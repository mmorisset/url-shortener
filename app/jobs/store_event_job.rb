class StoreEventJob < ApplicationJob
  queue_as :default

  def perform(event_attributes)
    client = Elasticsearch::Client.new(url: ENV['ELASTICSEARCH_URL'], log: true)
    repository = EventRepository.new(client: client)
    event = Event.new(event_attributes)
    repository.save(event)
  end
end
