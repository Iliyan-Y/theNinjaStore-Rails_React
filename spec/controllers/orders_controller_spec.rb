# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::OrdersController do
  describe "GET index" do

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
      expect(res_body[0]['customer_name']).to eq("Kiro")
    end

    it "is forbiden for non admin users" do
      allow(@user).to receive(:admin).and_return(false)
      get :index 
      expect(response.status).to eq(403)
    end
  end
end
