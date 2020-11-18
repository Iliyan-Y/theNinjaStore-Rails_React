class Order < ApplicationRecord
  def self.find_products(orderIds)
      orderIds.map {|id| Product.find(id)}
  end
end
