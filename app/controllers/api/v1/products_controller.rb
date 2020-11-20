class Api::V1::ProductsController < ActionController::API
  include ActionController::Helpers
  helper ApplicationHelper

  before_action :find_product, only: [:show, :destroy, :update]
  before_action :find_user, only: [:update, :destroy, :create]

  def index 
    products = Product.all
    render json: helpers.render_products(products), status: :ok
  end

  def create
    product = Product.create(product_params)
    add_photos(product)
    if product.save && @user
      render json: product, status: :created
    else
      render json: product.errors, status: :unprocessable_entity 
    end   
  end

  def show
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

  def update
    if @user && @product.update(product_params)
      head 200
    else
      head 400
    end
  end

  def destroy
    if @user 
      @product.destroy
      head 200
    else 
      head 403
    end
  end

  private 

  def find_product 
    @product = Product.find(params['id'])
  end

  def find_user
    @user = User.decode(request.headers['token'])
  end

  def product_params
    params.require(:product).permit(:name, :description, :price, :image)
  end

  def photos_params
    params.require(:photos).permit(:"0", :"1", :"2", :"3", :"4")
  end

  def add_photos(product)
    for n in 0..4 do 
      product.photos.attach(photos_params[:"#{n}"]) unless photos_params[:"#{n}"] == "undefined"
    end
  end

end