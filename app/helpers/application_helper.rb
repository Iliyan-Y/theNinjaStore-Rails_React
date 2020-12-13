module ApplicationHelper
  def render_products(products)
    products.map do |product|
      {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        created_at: product.created_at,
        image: url_for(product.image)
        # galery: product.photos.map{|img| url_for(img)}
      } 
    end
  end

  def create_line_items(products)
    formated_products = render_products(products)
    line_items = []
    formated_products.each do |product|
      data = {
        price_data: {
          unit_amount: (product[:price] * 100).round,
          currency: 'gbp',
          product_data: {
            name: product[:name],
            #images: ['https://i.imgur.com/EHyR2nP.png'],
          },
        },
        quantity: 1,
      }
      line_items.push(data)
    end
    line_items
  end
end

