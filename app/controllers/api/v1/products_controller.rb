class Api::V1::ProductsController < ActionController::API
  def index 
    products = Product.all
    products = products.map do |product|
      {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        created_at: product.created_at
      } 
    end

    render json: {results: products}.to_json, status: :ok
  end
end