# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::OrdersController do
  describe 'GET index' do
    before(:each) do
      allow(controller).to receive(:find_user).and_return(true)
      create_order('Kiro')
    end

    it 'Shows all orders to the admin users only' do
      allow(@user).to receive(:admin).and_return(true)
      expect = Order.first

      get :index
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body.length).to be > 0
      expect(res_body[0]['customer_name']).to eq('Kiro')
    end

    it 'is forbiden for non admin users' do
      allow(@user).to receive(:admin).and_return(false)
      get :index
      expect(response.status).to eq(403)
    end
  end

  describe 'POST display_products' do
    it 'Return Json formated prodcut list' do
      product = create_fake_prodcut
      post :display_products, params: { order: { productsId: [product.id] } }
      expect(response.status).to eq(200)
      expect(response.body).to match([product].to_json)
    end

    it 'Return error code 400 if invalid product list is passed' do
      allow(controller).to receive(:find_order_products).and_return([])
      post :display_products
      expect(response.status).to eq(400)
    end
  end

  describe 'POST change_status' do
    before(:each) do
      allow(controller).to receive(:find_user).and_return(true)
      @order = create_order
    end

    it 'Changes order status if user is admin' do
      allow(@user).to receive(:admin).and_return(true)
      post :change_status, params: { order: { id: @order.id, status: 'sent' }, id: @order.id }
      expect(response.status).to eq(200)
      expected = Order.first
      expect(expected.status).to eq('sent')
    end

    it 'is not allowed route for non admin users, return status 403' do
      allow(@user).to receive(:admin).and_return(false)
      post :change_status, params: { order: { id: @order.id, status: 'sent' }, id: @order.id }
      expect(response.status).to eq(403)
    end
  end
end
