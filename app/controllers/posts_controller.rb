# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.all.order(created_at: :desc).as_json(
      include: {
        user: { only: %i[name id organization_id] },
        categories: { only: %i[id name] }
      })
    render_json({ posts: })
  end

  def create
    params_with_user_id = post_params.merge(user_id: 1)
    post = Post.new(params_with_user_id)
    post.save!
    render_notice(t("successfully_created"))
  end

  def show
    post = Post.find_by!(slug: params[:slug])
    post = post.as_json(include: { user: { only: %i[name id organization_id] }, categories: { only: %i[id name] } })
    render_json({ post: })
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, category_ids: [])
    end
end
