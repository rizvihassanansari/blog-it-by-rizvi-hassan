# frozen_string_literal: true

class CategoriesController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token

  def index
    keyword = params[:search]

    categories = []
    if keyword.present?
      categories = Category.where("name LIKE ?", "%#{keyword.to_s}%")
    else
      categories = Category.all
    end

    render_json({ categories: })
  end

  def create
    category = Category.new(category_params)
    category.save!
    render_notice(t("successfully_created.category"))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
