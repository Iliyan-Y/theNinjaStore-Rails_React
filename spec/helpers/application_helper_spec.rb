# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationHelper, type: :helper do
  describe '#render_products' do
    it 'creates a hash of products when products array is passed as argument' do
      product = FakeProduct.new
      expected = [{
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        created_at: product.created_at,
        image: product.image
      }]

      expect(helper.render_products([product])).to match(expected)
    end
  end

  describe '#create_line_items' do
    it 'create line_items array of hashes with the correct format for Stripe API price_data object' do
      product = FakeProduct.new
      expected = [{
        price_data: {
          unit_amount: (product.price * 100).round,
          currency: 'gbp',
          product_data: {
            name: product.name
          }
        },
        quantity: 1
      }]

      expect(helper.create_line_items([product])).to match(expected)
    end
  end
end

class FakeProduct
  attr_reader :id, :name, :description, :price, :created_at, :image

  def initialize(id = 1, name = 'Soap', description = 'bubbly', price = 1, created_at = '01.01.2021')
    @id = id
    @name = name
    @description = description
    @price = price
    @created_at = created_at
    @image = 'asd'
  end
end
