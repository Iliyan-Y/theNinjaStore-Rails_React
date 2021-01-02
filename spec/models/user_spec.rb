require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#generate_token' do
    it 'generate JWT token based on user email' do
      token = User.generate_token('some@email.com')
      expect(token.length).to be(121)
    end
  end
end
