class Product < ApplicationRecord
  has_one_attached :image
  has_many_attached :photos
  validates :price, :name, presence: true
end
