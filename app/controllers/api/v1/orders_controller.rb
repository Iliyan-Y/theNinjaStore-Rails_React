class Api::V1::OrdersController < ActionController::API

  def create 
    order = Order.create(order_params)
    if order.save  
      render json: order, status: 200
    else 
      head 403
    end
  end

  protected

  def order_params
    params.require(:order).permit(:email, :customer_name, :address, :phone, :post_code, :productsId => [] )
  end

end