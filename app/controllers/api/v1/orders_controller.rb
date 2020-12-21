class Api::V1::OrdersController < ActionController::API
  include ActionController::Helpers
  helper ApplicationHelper

  before_action :find_user, only: [:index, :change_status, :create, :user_orders]
  before_action :find_order_products, only: [:create, :display_products]

  def index 
    order = Order.all 
    if @user.admin  
      render json: order, status: 200
    else 
      head 403
    end
  end

  def create 
    # if @user
    #   order = @user.orders.create(order_params)
    # else 
    #   order = Order.create(order_params)
    # end
    customer = Stripe::Customer.create({
      name: params["order"]["customer_name"],
      phone: params["order"]["phone"],
      email: params["order"]["email"]
    })

    session = Stripe::Checkout::Session.create({
      customer: customer.id,
      shipping_address_collection: {
        allowed_countries: ['GB', 'BG', 'FR', 'DE', 'BE', 'DK', 'IE', 'IT', 'ES']
      },  
      payment_method_types: ['card'],
      line_items: helpers.create_line_items(@order_products),
      mode: 'payment',
      success_url: checkout_success_url,
      cancel_url: checkout_cancel_url,
      metadata: { 
        name: params["order"]["customer_name"],
        phone: params["order"]["phone"],
        email: params["order"]["email"] 
      }
    })

    if session 
      # OrderMailer.with(order: order).new_order_email.deliver_now
      render json: { sessionId: session.id }, status: 200
    else
      head 400
    end
  end

  def confirm_order
    payload = request.body.read
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    event = nil

    begin
      event = Stripe::Webhook.construct_event(
        payload, sig_header, ENV['END_POINT']
      )
    rescue JSON::ParserError => e
      # Invalid payload
      status 400
      return
    rescue Stripe::SignatureVerificationError => e
      # Invalid signature
      status 400
      return
    end

    # begin
    #   event = Stripe::Event.construct_from(
    #     JSON.parse(payload, symbolize_names: true)
    #   )
    # rescue JSON::ParserError => e
    #   # Invalid payload
    #   status 400
    #   return
    # end

    # Handle the event
    case event.type
    when 'payment_intent.succeeded'
      payment_intent = event.data.object # contains a Stripe::PaymentIntent
      # Then define and call a method to handle the successful payment intent.
      # handle_payment_intent_succeeded(payment_intent)
      2.times {p "------------ payment intent succeeded-----------------"}
      p payment_intent
     
      2.times {p "------------ payment intent succeeded-----------------"}
    when 'checkout.session.async_payment_succeeded'
      payment_intent = event.data.object # contains a Stripe::PaymentIntent
      # Then define and call a method to handle the successful payment intent.
      # handle_payment_intent_succeeded(payment_intent)
      2.times {p "------------checkout.session.async_payment_succeeded-----------------"}
      p payment_intent
      2.times {p "------------checkout.session.async_payment_succeeded-----------------"}
    else
      puts "Unhandled event type: #{event.type}"
    end

    head 200
  end

  def check_payment
    
    5.times {p "mqlmql mlq"}
    # if @payment_success
    #   render json: @payment_success, status: 200
    # else
    #   head 400
    # end
  end

  def display_products
    if @order_products
      render json: helpers.render_products(@order_products), status: 200
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

  def find_order_products
    @order_products = Order.find_products(params["order"]["productsId"])
  end

  def find_user
    return false if request.headers['token'] == "undefined"
    
    user_from_token = User.decode(request.headers['token'])
    @user = User.find_by_email(user_from_token['user'])
  end

  def order_params
    params.require(:order).permit(:email, :customer_name, :phone, :status, :number_of_items, :productsId => [])
  end

end