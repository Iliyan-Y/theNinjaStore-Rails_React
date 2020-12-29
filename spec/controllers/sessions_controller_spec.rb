require 'rails_helper'

RSpec.describe Api::V1::Users::SessionsController do
  before(:each) do
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end

  describe 'POST create' do
    let(:post_params) { { user: { email: 'some@email.com', password: 'test123' } } }

    before(:each) do
      allow(controller).to receive(:load_user)
      @mock_user = double('user')
      controller.instance_variable_set(:@user, @mock_user)
    end

    it 'create new user session' do
      allow(@mock_user).to receive(:email).and_return('user@example.com')
      allow(@mock_user).to receive(:valid_password?).and_return(true)
      allow(@mock_user).to receive(:update_attributes)

      post :create, params: post_params
      res = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(res['messages']).to eq('Signed In Successfully')
    end

    it 'return Unaltorized code if put wrong credentials' do
      allow(@mock_user).to receive(:valid_password?).and_return(false)
      post :create, params: post_params
      expect(response.status).to eq(401)
    end
  end

  describe 'GET verifiy' do
    it 'return status 200 on succsessful token authentication' do
      create_test_user
      test_user = User.first
      request.headers['token'] = test_user.auth_token
      get :verify
      expect(response.status).to eq(200)
    end
  end
end
