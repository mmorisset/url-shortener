Given /^I come from "(.*?)"$/ do |referrer|
  @referral_url = referrer
  add_headers 'Referer' => @referral_url
end

When(/^I (?:am|go) (?:to|on) "(.*?)" page$/) do |page|
  visit path_to(page)
end

When(/^I click on "(.*?)"(?: button)?$/) do |link_or_button|
  click_on link_or_button
end

When(/^I empty the "(.*?)" field$/) do |field|
  fill_in field, with: ''
end

When(/^I go on the "(.*?)" tab$/) do |tab|
  find('.nav-tabs a', text: tab).click
end

When(/^I go on the "(.*?)" tab of "(.*?)" page$/) do |tab, page|
  steps %{
    When I go on "#{page}" page
    And I go on the "#{tab}" tab
  }
end

When(/^I fill the "(.*?)" field with "(.*?)"$/) do |field, value|
  # FIXME: We should not use capybara universal steps
  fill_in field, with: value
end

When(/^I select "([^\"]*)" from "([^\"]*)"$/) do |value, field|
  bootstrap_select(value, from: field)
end

Then(/^I should (?:be redirected to|stay on) "(.*?)" page$/) do |page_name|
  page_path = URI.parse(path_to(page_name)).path
  current_path = URI.parse(current_url).path
  expect(current_path).to eq page_path
end

Then(/^I should be redirected to "(.*?)" url$/) do |page_name|
  expect(@destination_link).to eq(path_to(page_name))
end

Then(/^I should see a (\d+) page$/) do |code|
  expect(page.status_code).to eq(code)
end

Then(/^I should see a "(.*?)" link pointing to "(.*?)" page$/) do |link_label, page_name|
  expect(page).to have_link(link_label, href: path_to(page_name))
end

Then(/^I should see a "(.*?)" link pointing to "(.*?)" page in a new tab$/) do |link_label, page_name|
  expect(page).to have_link(link_label, href: path_to(page_name))
  expect(find_link(link_label)[:target]).to eq '_blank'
end

Then(/^I should see a "(.*?)" link pointing to "(.*?)" page within a modal$/) do |link_label, page_name|
  within '.modal-dialog' do
    expect(page).to have_link(link_label, href: path_to(page_name))
  end
end

Then(/^I should see a "(.*?)" link pointing to "(.*?)" page in a new tab within a modal$/) do |link_label, page_name|
  within '.modal-dialog' do
    expect(page).to have_link(link_label, href: path_to(page_name))
    expect(find_link(link_label)[:target]).to eq '_blank'
  end
end

Then(/^I should( not)? see "(.*?)"$/) do |negation, value|
  negate_with(negation) do
    expect(page).to have_content(value, normalize_ws: true)
  end
end

Then(/^I should( not)? see "(.*?)" in the title$/) do |negation, title|
  negate_with(negation) do
    expect(page).to have_title(title)
  end
end

Then(/^I should see the following title: "(.*?)" in the top bar$/) do |title|
  expect(find('#topbar')).to have_content title
end

Then(/^I should see the following error: "(.*?)"$/) do |message|
  expect(page).to have_content message
end

Then(/^I should not see the following error: "(.*?)"$/) do |message|
  expect(page).to_not have_content message
end

Then(/^the "(.*?)" attribute of the "(.*?)" (button|link) should be "(.*?)"$/) do |attribute,text,value|
  expect(page.find("a", text: text)[attribute]).to eq(value)
end
