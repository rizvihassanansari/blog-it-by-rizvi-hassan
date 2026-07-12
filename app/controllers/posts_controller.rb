# frozen_string_literal: true

class PostsController < ApplicationController
  PAGE_SIZE = 10

  def index
    page = [params[:page].to_i, 1].max
    category_ids = Array(params[:categories]).map(&:to_i)

    posts = []
    total_results = 0
    if category_ids.present?
      filtered_posts = Post
        .joins(:categories)
        .where(categories: { id: category_ids })
        .distinct
        .order(created_at: :desc)

      total_results = filtered_posts.count

      posts = filtered_posts
        .limit(PAGE_SIZE)
        .offset((page - 1) * PAGE_SIZE)
        .as_json(include: { user: { only: %i[name id organization_id] }, categories: { only: %i[id name] } })

    else
      total_posts = Post.all.order(created_at: :desc)
      total_results = total_posts.count

      posts = total_posts
        .limit(PAGE_SIZE)
        .offset((page - 1) * PAGE_SIZE)
        .as_json(include: { user: { only: %i[name id organization_id] }, categories: { only: %i[id name] } })
    end

    render_json({ posts:, total_results: })
  end

  def create
    params_with_user_id = post_params.merge(user_id: 1)
    post = Post.new(params_with_user_id)
    post.save!
    render_notice(t("successfully_created.post"))
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
