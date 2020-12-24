class Order < ApplicationRecord
  def self.find_products(orderIds)
      orderIds.map {|id| Product.find(id)}
  end

  def self.make_order(payment_intent, customer_info)
    total_amount = payment_intent.amount / 100
    shipping = payment_intent.shipping
    address = "City: #{shipping.address.city}, country: #{shipping.address.country}, line1: #{shipping.address.line1}, line2: #{shipping.address.line2}"
    itmes = customer_info.metadata.products.split(",")
    self.create(email: customer_info.email,
      customer_name: customer_info.name,
      address: address,
      phone: customer_info.phone,
      post_code: shipping.address.postal_code,
      productsId: itmes,
      number_of_items: itmes.length,
      total_price: total_amount,
      customer_id: customer_info.id,
      payment_id: payment_intent.id,
      recipient_name: shipping.name)
  end
end
