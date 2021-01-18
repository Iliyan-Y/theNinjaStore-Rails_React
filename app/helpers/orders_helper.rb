module OrdersHelper
  def create_stripe_session(customer, line_items)
    Stripe::Checkout::Session.create({
                                       customer: customer.id,
                                       shipping_address_collection: {
                                         allowed_countries: %w[GB BG FR DE BE DK IE IT ES]
                                       },
                                       payment_method_types: ['card'],
                                       line_items: line_items,
                                       mode: 'payment',
                                       success_url: checkout_success_url,
                                       cancel_url: checkout_cancel_url
                                     })
  end

  def create_stripe_customer(params, email)
    Stripe::Customer.create({
                              name: params['order']['customer_name'],
                              phone: params['order']['phone'],
                              email: email,
                              metadata: { products: params['order']['productsId'].join(',') }
                            })
  end
end
