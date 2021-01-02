# frozen_string_literal: true

class OrderMailer < ApplicationMailer
  def new_order_email
    @order = params[:order]

    mail(to: ENV['ADMIN_EMAIL'], subject: 'You got a new order!')
  end
end
