# frozen_string_literal: true

class AddCustumeridToOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :customer_id, :string
    add_column :orders, :payment_id, :string
    add_column :orders, :recipient_name, :string
  end
end
