class StoreEventJob < ApplicationJob
  queue_as :default

  def perform(event_attributes)
    repository = EventRepository.new()
    event = Event.new(event_attributes)
    repository.save(event)
  end
end
