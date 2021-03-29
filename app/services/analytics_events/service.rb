module AnalyticsEvents
  class Service
    def initialize(collection)
      @collection = collection
    end

    class << self
      # Usage:
      #
      #     AnalyticsEvents::Service.track_event(:visited_url, {...})
      #
      #
      def track_event(collection, attributes = {})
        new(collection).track_event(attributes)
      end
    end

    # Internal: must only be called by the `track_event` class method
    def track_event(attributes)
      @attributes = {
        collection: @collection,
        created_at: Time.now.utc
      }.merge!(attributes)
      save_event
    end

    protected

    def save_event
      StoreEventJob.perform_later(@attributes)
    end
  end
end
