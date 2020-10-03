require 'rails_helper'

RSpec.describe Product, type: :model do

  it "Add a product to the producs database" do 
   product =  Product.create(name: "Test", description:"Testeste", price: "1.00")
   expect(Product.all[0]).to eq product
  end

  it "return all the products in the database" do 
    3.times { Product.create(name: "Test", description:"Testeste", price: "1.00")}
    expect(Product.all.length).to be > 1
  end

end
