# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Product, type: :model do
  before(:each) do
    @product = Product.create(name: 'Test', description: 'Testeste', price: '1.00')
  end

  it 'Add a product to the producs database' do
    expect(Product.all[0]).to eq @product
  end

  it 'return all the products in the database' do
    3.times { Product.create(name: 'Test', description: 'Testeste', price: '1.00') }
    expect(Product.all.length).to be > 1
  end

  it 'expect product tohave image attached' do
    image = create_test_image
    @product.image.attach(image)
    expect(@product.image.attached?).to be(true)
  end

  it 'expect product tohave more then 1 photo attached in the gallery' do
    image = create_test_image
    second_image = create_test_image
    @product.photos.attach(image)
    @product.photos.attach(second_image)
    expect(@product.photos.attached?).to be(true)
    expect(@product.photos.length).to be > 1
  end
end
