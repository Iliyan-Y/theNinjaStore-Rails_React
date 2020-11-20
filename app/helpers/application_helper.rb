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
       # galery: product.photos.map{|img| all = [] all.push(url_for(img))}
      } 
    end
  end
end
