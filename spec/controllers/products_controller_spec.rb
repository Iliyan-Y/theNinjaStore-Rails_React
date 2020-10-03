require 'rails_helper'

RSpec.describe Api::V1::ProductsController do
  describe "GET index" do
    it "Return status 200 " do
      get :index
      expect(response).to have_http_status(:ok)
    end

    it "Return json formated products" do 
      Product.create(name: "Test", description:"Testeste", price: "1.00")
      expected = Product.where(name: "Test")
     
      get :index
      expect(response.body).to match(expected.to_json) 
    end

  end
end