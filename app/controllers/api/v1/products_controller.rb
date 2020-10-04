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

  def create
    product = Product.new(product_params)

    if product.save
      render json: product, status: :created
    else
      render json: product.errors, status: :unprocessable_entity 
    end
    
  end

  private 
  def product_params
    params.require(:product).permit(:name, :description, :price, :image)
  end
end