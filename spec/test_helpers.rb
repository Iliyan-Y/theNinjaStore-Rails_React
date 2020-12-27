# frozen_string_literal: true

require 'simplecov'
SimpleCov.start 'rails'

module TestHelpers
  def create_test_image
    file = Rails.root.join('app', 'assets', 'images', 'Techno.jpg')

    ActiveStorage::Blob.create_after_upload!(
      io: File.open(file, 'rb'),
      filename: 'Techno.jpg',
      content_type: 'image/jpg' # Or figure it out from `name` if you have non-JPEGs
    ).signed_id
  end

  def create_fake_prodcut(name = 'Test')
    image = create_test_image
    Product.create(name: name, description: 'Testeste', price: '1.00', image: image)
  end
end
