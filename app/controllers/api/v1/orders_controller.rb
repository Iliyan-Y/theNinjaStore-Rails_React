class Api::V1::OrdersController < ActionController::API
  include ActionController::Helpers
  helper ApplicationHelper

  before_action :find_user, only: [:index, :change_status, :create, :user_orders]

  def index 
    order = Order.all 
    if @user.admin  
      render json: order, status: 200
    else 
      head 403
    end
  end

  def create 
    if @user
      order = @user.orders.create(order_params)
    else 
      order = Order.create(order_params)
    end

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
    if @user.admin
      Order.update(params["order"]["id"], status: params["order"]["status"])
      head 200
    else
      head 403
    end
  end

  def user_orders
    if @user
      render json: @user.orders, status: 200
    else
      head 400
    end
  end

  protected

  def find_user
    return false if request.headers['token'] == "undefined"
    
    user_from_token = User.decode(request.headers['token'])
    @user = User.find_by_email(user_from_token['user'])
  end

  def order_params
    params.require(:order).permit(:email, :customer_name, :address, :phone, :post_code, :status, :number_of_items, :productsId => [])
  end

end