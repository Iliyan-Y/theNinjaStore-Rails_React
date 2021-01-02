# frozen_string_literal: true

require 'rails_helper'

RSpec.describe OrderMailer, type: :mailer do
  describe '#new_order_email' do
    let(:order) do
      double('order', customer_name: 'Gogo', email: 'example@me', address: 'Some address', phone: '0000',
                      number_of_items: 2, total_price: 220)
    end
    let(:mail) { OrderMailer.with(order: order).new_order_email }

    it 'renders the headers' do
      expect(mail.subject).to eq('You got a new order!')
    end

    it 'renders the body' do
      expect(mail.body.encoded).to include('Address: Some address')
      expect(mail.body.encoded).to include('Name: Gogo')
      expect(mail.body.encoded).to include('Email: example@me')
      expect(mail.body.encoded).to include('Phone: 0000')
      expect(mail.body.encoded).to include('Number of items 2')
      expect(mail.body.encoded).to include('Total value: 220')
    end
  end
end
