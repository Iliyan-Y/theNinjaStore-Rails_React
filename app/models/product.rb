# frozen_string_literal: true

class Product < ApplicationRecord
  has_one_attached :image
  has_many_attached :photos
  
  validates :price, :name, presence: true
  validates :image, attached: true, content_type: ['image/png', 'image/jpg', 'image/jpeg']
  validates :photos, content_type: ['image/png', 'image/jpg', 'image/jpeg']
end
