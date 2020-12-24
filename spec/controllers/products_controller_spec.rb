require 'rails_helper'

RSpec.describe Api::V1::ProductsController do
  describe "GET index" do
    it "Return status 200 " do
      get :index
      expect(response).to have_http_status(:ok)
    end

    it "Return json formated products" do 
      file = Rails.root.join('app', 'assets', 'images', 'Techno.jpg')
      
      image = ActiveStorage::Blob.create_after_upload!(
        io: File.open(file, 'rb'),
         filename: 'Techno.jpg',
         content_type: 'image/jpg' # Or figure it out from `name` if you have non-JPEGs
       ).signed_id

      Product.create(name: "Test", description:"Testeste", price: "1.00", image: image)

      expected = Product.where(name: "Test")
     
      get :index
      expect(response.body).to match(expected.to_json) 
    end

  end

  describe "POST create" do 

    file = Rails.root.join('app', 'assets', 'images', 'Techno.jpg')
      
    image = ActiveStorage::Blob.create_after_upload!(
      io: File.open(file, 'rb'),
       filename: 'Techno.jpg',
       content_type: 'image/jpg' # Or figure it out from `name` if you have non-JPEGs
     ).signed_id

    let (:product) do
       {
        name: "Lebara",
        description: "2018-12-12",
        price: "15",
        image: image
      }

    end
    let (:photos) do
      {
        "0": "Lebara",
        "1": "2018-12-12"
      }
    end

    before(:each) do
      allow(controller).to receive(:find_user).and_return(true)
    end

    it "return Json formated product" do 
      
     expect { post :create, params: {product: product, photos: photos } }.to change(Product, :count).by(1)
    
    end
  end

end