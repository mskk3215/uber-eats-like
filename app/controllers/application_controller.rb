class ApplicationController < ActionController::API

  # spa理解のために入れるだけ。本番環境では不要
  before_action :fake_load
  def fake_load
    sleep(1)
  end

end
