class Product < ApplicationRecord
  has_one_attached :image
  validates :price, :name, presence: true

end
