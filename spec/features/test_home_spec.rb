require 'rails_helper'

RSpec.feature "Photo", type: :feature do
  scenario "Visit the home page and see react set up"do 
    visit("/")
    expect(page).to have_content("")
  end
end