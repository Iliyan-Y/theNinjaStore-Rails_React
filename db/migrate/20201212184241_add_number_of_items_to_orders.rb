class AddNumberOfItemsToOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :number_of_items, :integer
  end
end
