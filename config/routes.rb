Rails.application.routes.draw do
  # namespaceで名前空間を付与する。コントローラーをグルーピングし、urlにもその情報を付与。
  # app/controllers/api/v1/というディレクトリに作成
  namespace :api do
    namespace :v1 do
      resources :restaurants do
        resources :foods, only: %i[index]
      end
      resources :line_foods, only: %i[index create]
      # 特定のリソースに対するルーティング設定
      # line_foods/replaceというURLのリクエストが来たらline_foods_controllerのreplaceメソッドを呼ぶ
      put "line_foods/replace", to:"line_foods#replace"
      resources :orders, only: %i[create]
    end
  end
end
