# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ProductsController do
  describe 'GET index' do
    it 'Return status 200 ' do
      get :index
      expect(response).to have_http_status(:ok)
    end

    it 'Return json formated products' do
      image = create_test_image
      Product.create(name: 'Test', description: 'Testeste', price: '1.00', image: image)
      expected = Product.where(name: 'Test')

      get :index
      expect(response.body).to match(expected.to_json)
    end
  end

  describe 'POST create' do
    image = create_test_image
    let(:product) do
      {
        name: 'Lebara',
        description: '2018-12-12',
        price: '15',
        image: image
      }
    end
    let(:photos) do
      {
        "0": 'undefined'
      }
    end

    before(:each) do
      allow(controller).to receive(:find_user).and_return(true)
      allow(@user).to receive(:admin).and_return(true)
      # allow(controller).to receive(:current_user).and_return(FactoryGirl.create(:admin_user) # better option
    end

    it 'return Json formated product' do
      expect { post :create, params: { product: product, photos: photos } }.to change(Product, :count).by(1)
    end
  end
end
