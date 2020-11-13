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
    order = @user.orders.create(order_params)
    if order.save 
      head 200
    else 
      head 400
    end
  end

  def find_user 
    token = User.decode(params['order']['token'])
    return false unless token == nil
    
    @user = User.find_by_email(@token['email'])
    return false unless @user == nil

  end

  def order_params
    params.require(:order).permit(:token, :products => [])
  end

end