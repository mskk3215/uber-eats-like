# moduleとつけることで名前空間を指定
module Api
  module V1
    class RestaurantsController < ApplicationController

      def index
        restaurants = Restaurant.all
        # javascriptのオブジェクト記法を元にしたデータの形
        render json: {
          restaurants: restaurants
          # リクエストが成功したこと、200 okと一緒にデータを返す
        }, status: :ok
      end

    end
  end
end
