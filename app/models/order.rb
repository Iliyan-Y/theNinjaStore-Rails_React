class Order < ApplicationRecord
  belongs_to :user
  #validates :products, :presence => true
end
