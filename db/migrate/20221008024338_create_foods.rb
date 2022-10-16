class CreateFoods < ActiveRecord::Migration[7.0]
  def change
    create_table :foods do |t|
      t.references :restaurant, null:false, foreign_key:true, commnet: "所属するレストランのid"
      t.string :name, null:false, comment: "フードの名前"
      t.integer :price, null:false, comment: "フードの価格"
      t.text :description, null:false, comment: "フードの説明文"
      t.timestamps
    end
  end
end
