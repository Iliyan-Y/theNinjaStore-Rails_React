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

  def create_order(name = 'Pesho', email = 'test@email.com')
    Order.create(status: 'new', email: email, customer_name: name, address: 'sreet 12', phone: '020321030',
                 productsId: [1, 2])
  end

  def create_test_user(email = 'example@me.com')
    user = User.create(email: email, password: '123456', password_confirmation: '123456')
    user.auth_token = User.generate_token(email)
    user.save
  end

  class FakeProduct
    attr_reader :id, :name, :description, :price, :created_at

    def initialize(id = 1, name = 'Soap', description = 'bubbly', price = 1, created_at = '01.01.2021')
      @id = id
      @name = name
      @description = description
      @price = price
      @created_at = created_at
    end
  end
end
