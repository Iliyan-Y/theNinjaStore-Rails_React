class Api::V1::OrdersController < ActionController::API

  def create 
    if find_user 
      create_order
    else 
      head 403
    end
  end

  protected

  def create_order
    order = @user.orders.create(products: params['order']['productsId'])
    if order.save 
      render json: order, status: 200
    else 
      head 400
    end
  end

  def find_user 
    token = User.decode(params['order']['token'])
    return false unless token

    @user = User.find_by_email(token['user'])
  end

  def order_params
    params.require(:order).permit(:token, :productsId => [])
  end

end