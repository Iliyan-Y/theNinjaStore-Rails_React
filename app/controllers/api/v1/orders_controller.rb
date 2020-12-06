class Api::V1::OrdersController < ActionController::API
  include ActionController::Helpers
  helper ApplicationHelper

  before_action :find_user, only: [:index, :change_status]

  def index 
    order = Order.all 
    if @user  
      render json: order, status: 200
    else 
      head 403
    end
  end

  def create 
    order = Order.create(order_params)
    if order.save  
      OrderMailer.with(order: order).new_order_email.deliver_now
      render json: order, status: 200
    else 
      head 403
    end
  end

  def display_products
    products = Order.find_products(params["order"]["productsId"])
    if products
      render json: helpers.render_products(products), status: 200
    else
      head 400
    end
  end

  def change_status
    if @user
      Order.update(params["order"]["id"], status: params["order"]["status"])
      head 200
    else
      head 403
    end
  end

  protected

  def find_user
    @user = User.decode(request.headers['token'])
  end

  def order_params
    params.require(:order).permit(:email, :customer_name, :address, :phone, :post_code, :status, :productsId => [])
  end

end