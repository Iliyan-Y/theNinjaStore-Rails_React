# frozen_string_literal: true

class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.string :email, null: false
      t.string :customer_name, null: false
      t.string :address, null: false
      t.string :phone, null: false
      t.string :post_code
      t.string :productsId, array: true, null: false
      t.string :status, default: 'New'

      t.timestamps
    end
    add_index :orders, :productsId, using: 'gin'
  end
end
