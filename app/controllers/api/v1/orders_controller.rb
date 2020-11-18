class Api::V1::OrdersController < ActionController::API

  def index 
    user = User.decode(request.headers['token'])
    order = Order.all 

    if user  
      render json: order, status: 200
    else 
      head 403
    end

  end

  def create 
    order = Order.create(order_params)
    if order.save  
      render json: order, status: 200
    else 
      head 403
    end
  end

  def display_products
    products = Order.find_products(params["order"]["productsId"])
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
    if products
      render json: products, status: 200
    else
      head 400
    end
  end

  protected
  
  def order_params
    params.require(:order).permit(:email, :customer_name, :address, :phone, :post_code, :productsId => [] )
  end

end