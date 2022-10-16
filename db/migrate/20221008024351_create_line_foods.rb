class CreateLineFoods < ActiveRecord::Migration[7.0]
  def change
    create_table :line_foods do |t|
      t.references :food, null: false, foreign_key: true, comment: "外部key:フード"
      t.references :restaurant, null: false, foreign_key: true, comment: "外部key:レストラン"
      t.references :order, foreign_key: true,comment: "外部key:注文"
      t.integer :count, null: false, default: 0,comment: "注文数量"
      t.boolean :active, null: false, default: false, comment:"仮注文かどうか"

      t.timestamps
    end
  end
end
