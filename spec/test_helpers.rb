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

  def new_fake_customer
    metadata = OpenStruct.new({ products: '1,2,3' })
    OpenStruct.new({ metadata: metadata, name: 'Kiro', email: 'kiro@skalata.com', phone: '2323132',
                     id: 4 })
  end

  def new_fake_payment
    address = OpenStruct.new({
                               city: 'Dos Locos',
                               country: 'Republic of Mars',
                               line1: '3 street',
                               line2: '',
                               postal_code: 'SE'
                             })
    shipping = OpenStruct.new({ address: address, name: 'Kiro Skalata' })
    OpenStruct.new({ amount: 1000, shipping: shipping, id: 3333 })
  end
end
