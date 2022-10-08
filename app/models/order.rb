class Order < ApplicationRecord
  has_many :line_foods

  validates :total_price, numericality: { greater_than: 0 }

  def save_with_update_line_foods!(line_foods)
    # transaction内で例外が発生した場合ロールバックが発生する
    ActiveRecord::Base.transaction do
      # LineFoodデータの更新
      line_foods.each do |line_food|
        line_food.update!(active: false, order: self)
      end
      # orderデータの保存処理
      self.save!    
    end
  end
end
