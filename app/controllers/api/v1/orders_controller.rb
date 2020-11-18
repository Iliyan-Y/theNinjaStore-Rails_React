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