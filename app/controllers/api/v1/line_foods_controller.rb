module Api
  module V1
    class LineFoodsController < ApplicationController
      before_action :set_food, only: %i[create replace]

      def index
        # LineFoodのactive: trueなものが一覧としてActiveRecord_Relationの形で取得できる
        # modelの箇所でscopeでactive: trueとしたものを取得
        line_foods = LineFood.active
        if line_foods.exists?
          line_food_ids = []
          count = 0 
          amount = 0
          #繰り返し処理だけで良いのであればmapではなくeachを使用する
          line_foods.each do |line_food|
            line_food_ids << line_food.id # (1) idを参照して配列に追加する
            count += line_food[:count] # (2)countのデータを合算する
            amount += line_food.total_amount # (3)total_amountを合算する
          end
          
          render json: {
            line_food_ids: line_food_ids,
            restaurant: line_foods[0].restaurant,
            count: count,
            amount: amount,
          }, status: :ok
        else
          render json: {}, status: :no_content
        end          
          # render json: {
          #   # LineFoodのidを配列形式に取り出す。mapメソッドは配列やハッシュオブジェクトを１つずつ取り出す
          #   line_food_ids: line_foods.map { |line_food| line_food.id },
          #   restaurant: line_foods[0].restaurant,
          #   count: line_foods.sum { |line_food| line_food[:count] },
          #   amount: line_foods.sum { |line_food| line_food.total_amount },
          # }, status: :ok
      end

      def create
        # 他店舗でactiveなlinefoodをactiverecordの形で取得し引数として@ordered_food.restraurant.idを私存在するか判定
        if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
          # すでに作成されている他店舗の情報と新店舗の情報を返し、http response status code 406を返している
          return render json: {
            existing_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
            new_restaurant: Food.find(params[:food_id]).restaurant.name,
          }, status: :not_acceptable
        end
  
        set_line_food(@ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      def replace
        # map関数は配列を返すが、eachはただ繰り返し処理を行うだけ
        LineFood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_food|
          line_food.update_attribute(:active, false)
        end

        set_line_food(@ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      private
      def set_food
        # @をつけることでcreate action内で@orderd_foodを参照することができる
        # ただしglobalに定義する時のみ使用する
        @ordered_food = Food.find(params[:food_id])
      end

      def set_line_food(ordered_food)
        # foodに関するline_foodが存在するかどうか
        if ordered_food.line_food.present?
          # line_foodが存在すればcountとactiveを更新する
          @line_food = ordered_food.line_food
          @line_food.attributes = {
            count: ordered_food.line_food.count + params[:count],
            active: true
          }
        else
          # line_foodが存在しなければ新規作成する
          @line_food = ordered_food.build_line_food(
            count: params[:count],
            restaurant: ordered_food.restaurant,
            active: true
          )
        end
      end
    end
  end
end
