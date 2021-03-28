if defined?(DatabaseCleaner)
  # cleaning the database using database_cleaner
  DatabaseCleaner.strategy = :truncation
  DatabaseCleaner.clean
end

Rails.logger.info "APPCLEANED" # used by log_fail.rb
