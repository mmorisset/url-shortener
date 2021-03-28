class EventRepository
  include Elasticsearch::Persistence::Repository
  include Elasticsearch::Persistence::Repository::DSL

  klass Event
  index_name "events"
  document_type "event"

end
