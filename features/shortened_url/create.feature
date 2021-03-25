Feature: Create a shortened url
  In order to get a shortened url
  As a user
  I need to create it

Scenario: Successfull creation
  Given I am on "the home" page
  Given I fill the Original URL field with "http://google.com"
  When I click on "Shorten URL"
  Then a new shorten url should be created
  And I should be redirected to "the shortened url show" page
