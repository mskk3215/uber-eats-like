class LineFood < ApplicationRecord
  belongs_to :food
  belongs_to :restaurant
  # optionl: trueで関連付けしなくても良いという意味
  belongs_to :order, optional: true

  validates :count, numericality: { greater_than: 0 }
  # モデルそのものや関連するオブジェクトに対するクエリを指定することができ、返り値はActiveRecord_Relationとなる
  # 全てのLineFoodからwhereでactive:trueなもの一覧をActiveRecord_Relationの形で返す
  scope :active, -> { where(active: true) }
  # other_restaurantにpicked_restaurant_idを引数として、pickされていないrestarant_idをActiveRecord_Relationで取得する
  scope :other_restaurant, -> (picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id) }
  
  def total_amount
    food.price * count
  end

end
