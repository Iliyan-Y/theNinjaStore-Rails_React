# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Order, type: :model do
  describe '#find_products' do
    it "convert array of id's of a products to array of products objects" do
      product = create_fake_prodcut
      expect(Order.find_products([product.id])).to eq([product])
    end
  end

  describe '#make_order' do
    it 'Create order form Stripe API data of a payment intent and custumer object' do
      payment = new_fake_payment
      custumer = new_fake_customer

      expect { Order.make_order(payment, custumer) }.to change(Order, :count).by(1)
    end
  end
end
