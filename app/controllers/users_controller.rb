# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create

  def index
    users = User.all
    render_json({ users: })
  end

  def create
    user = User.create(user_params)
    user.save!
    render_notice(t("successfully_created.user"))
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :organization_id, :password, :password_confirmation)
    end
end
