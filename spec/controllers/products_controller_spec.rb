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
      # allow(controller).to receive(:current_user).and_return(FactoryGirl.create(:admin_user) # better option
    end

    it 'create a product and return Json of itself' do
      allow(@user).to receive(:admin).and_return(true)
      expect { post :create, params: { product: product, photos: photos } }.to change(Product, :count).by(1)
    end

    it 'not allowed method for non admin users' do
      allow(@user).to receive(:admin).and_return(false)
      post :create, params: { product: product, photos: photos }
      expect(response.status).to eq(403)
    end
  end

  describe 'GET show' do
    it 'shows a single product' do
      create_fake_prodcut
      create_fake_prodcut('Second Test')

      expected = Product.first
      second_prodcut = Product.all[1]

      get :show, params: { id: expected.id }
      res = JSON.parse(response.body)

      expect(res['name']).to eq(expected.name)
      expect(res['name']).not_to eq(second_prodcut.name)
    end
  end

  describe 'PATCH update' do
    before(:each) do
      allow(controller).to receive(:find_user).and_return(true)
      @product = create_fake_prodcut('fake_1')
      @update_params = { name: 'fake', description: 'fake', price: '2.00' }
    end

    it 'retunr status 200 on successful updated product' do
      allow(@user).to receive(:admin).and_return(true)
      put :update, params: { id: @product.id, product: @update_params }
      expect(response.status).to eq(200)
    end

    it "isn't available for normal users" do
      allow(@user).to receive(:admin).and_return(false)
      put :update, params: { id: @product.id, product: @update_params }
      expect(response.status).to eq(403)
    end
  end

  describe '#destroy' do
    before(:each) do
      allow(controller).to receive(:find_user).and_return(true)
      @product = create_fake_prodcut
    end

    it 'remove product from products if user is admin' do
      allow(@user).to receive(:admin).and_return(true)
      delete :destroy, params: { id: @product.id }
      expect(response.status).to eq(200)
    end

    it "is not available if user isn't admin" do
      allow(@user).to receive(:admin).and_return(false)
      delete :destroy, params: { id: @product.id }
      expect(response.status).to eq(403)
    end
  end
end
