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
      } 
    end
  end

  def find_user(token)
    @user = User.decode(token)
  end
  
end
