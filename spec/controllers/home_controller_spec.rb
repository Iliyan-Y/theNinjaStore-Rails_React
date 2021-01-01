require 'rails_helper'

RSpec.describe HomeController do
  describe 'GET new' do
    it 'is allowed route only for admin users' do
      allow(controller).to receive(:find_user)
      allow(@user).to receive(:admin).and_return(true)
      get :new
      expect(response.status).to eq(200)
    end

    it 'is forbiden for non admin users' do
      allow(controller).to receive(:find_user)
      allow(@user).to receive(:admin).and_return(false)
      get :new
      expect(response.status).to eq(403)
    end
  end
end
