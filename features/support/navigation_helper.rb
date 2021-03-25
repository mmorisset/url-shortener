module NavigationHelper

  def visit(*)
    super
  # There's no API to detect non-JavaScript drivers, here we silently catch
  # the exception for these drivers
  rescue Capybara::NotSupportedByDriverError
  end

  def url_to(page_name)
    app_url.chomp('/') + path_to(page_name)
  end

  def path_to(page_name)
    case page_name
      when "the home"
        root_path
      when "the shortened url show"
        shortened_url_path(@shortened_url)
    else
      raise "Can't find mapping from \"#{page_name}\" to a path.\n" +
        "Now, go and add a mapping in #{__FILE__}"
    end
  end

end

World(NavigationHelper)
