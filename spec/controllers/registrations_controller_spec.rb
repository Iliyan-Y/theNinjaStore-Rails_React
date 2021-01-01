require 'rails_helper'

RSpec.describe Api::V1::Users::RegistrationsController do
  before(:each) do
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end

  describe 'POST create' do
    let(:user_params) { { user: { email: 'example@me.com', password: 'test123', password_confirmation: 'test123' } } }

    it "create a user if all user credentials match" do
      post :create, params: user_params
      expect(response.status).to eq(200)
    end

    it "create and return user details if all user credentials match" do
      post :create, params: user_params
      res = JSON.parse(response.body)
      expect(res["data"]["user"]["email"]).to eq('example@me.com')
    end

    it "create and save user to the database" do
      post :create, params: user_params
      user = User.first
      res = JSON.parse(response.body)
      expect(res["data"]["user"]["id"]).to eq(user.id)
    end

    it "return status of unprocessable_entity(422) if user exist" do
      create_test_user
      post :create, params: user_params
      expect(response.status).to eq(422)
    end

    it "return status of unprocessable_entity(422) if password dont match" do
      post :create, params:  { user: { email: 'example@me.com', password: 'test123', password_confirmation: 'test12' } } 
      expect(response.status).to eq(422)
    end

  end

end