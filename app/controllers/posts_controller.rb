# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.all.order(created_at: :desc)
    render status: :ok, json: { posts: }
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfully_created"))
  end

  def show
    post = Post.find_by!(slug: params[:slug])
    render_json({ post: })
  end

  private

    def post_params
      params.require(:post).permit(%i[title description])
    end
end
