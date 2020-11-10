class Api::V1::ProductsController < ActionController::API
  before_action :find_product, only: [:show, :destroy]

  def index 
    products = Product.all
    products = products.map do |product|
      {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        created_at: product.created_at,
        image: url_for(product.image)
      } 
    end
    render json: products, status: :ok
  end

  def create
    product = Product.create(product_params)

    if product.save 
      render json: product, status: :created
    else
      render json: product.errors, status: :unprocessable_entity 
    end   
  end

  def show
   # product = Product.find(params['id'])
    product = {
      id: @product.id,
      name: @product.name,
      description: @product.description,
      price: @product.price,
      created_at: @product.created_at,
      image: url_for(@product.image)
    } 
    render json: product, status: :ok
  end

  def destroy
    @product.destroy
  end

  private 

  def find_product 
    @product = Product.find(params['id'])
  end

  def product_params
    params.require(:product).permit(:name, :description, :price, :image)
  end
end