3.times do |n|
  restaurant = Restaurant.new(
    name: "testレストラン_#{n}",
    fee: 100,
    time_required: 10,
  )

  12.times do |m|
    # Food.newすることなくリレーションを持ったfoodを生成することができる
    restaurant.foods.build(
      name: "フード名_#{m}",
      price: 500,
      description: "フード_#{m}の説明文です。"
    )
  end
  # データをDBに書き込む。
  # 例外を上げさせたい場合は、!をつける
  restaurant.save!
end
