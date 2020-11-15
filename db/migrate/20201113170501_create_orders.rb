class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.references :user, null: true, foreign_key: true
      t.string :email, null: false
      t.text :customer_name, null: false
      t.string :address, null: false
      t.string :phone, null: false
      t.string :post_code
      t.string :productsId, array: true, null: false

      t.timestamps
    end
    add_index :orders, :productsId, using: 'gin'
  end
end
