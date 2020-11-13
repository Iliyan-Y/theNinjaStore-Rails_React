class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.references :user, null: false, foreign_key: true
      t.string 'products', array: true

      t.timestamps
    end
    add_index :orders, :products, using: 'gin'
  end
end
