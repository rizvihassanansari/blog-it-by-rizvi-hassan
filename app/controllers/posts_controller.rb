# frozen_string_literal: true

class PostsController < ApplicationController
  PAGE_SIZE = 10

  def index
    page = [params[:page].to_i, 1].max
    category_ids = Array(params[:categories]).map(&:to_i)

    current_user_organization_id = current_user.organization_id

    posts = []
    total_results = 0
    if category_ids.present?
      filtered_posts = Post
        .joins(:categories)
        .where(is_bloggable: true, categories: { id: category_ids }, organization_id: current_user_organization_id)
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
        .where(is_bloggable: true, organization_id: current_user_organization_id)
        .limit(PAGE_SIZE)
        .offset((page - 1) * PAGE_SIZE)
        .as_json(include: { user: { only: %i[name id organization_id] }, categories: { only: %i[id name] } })
    end

    render_json({ posts:, total_results: })
  end

  def create
    post = Post.new(post_params)
    post[:user_id] = current_user.id
    post[:organization_id] = current_user.organization_id
    post.save!
    render_notice(t("successfully_created.post"))
  end

  def show
    post = Post.find_by!(slug: params[:slug])

    if post.user_id != current_user.id && post.is_bloggable == false
      render_error(t("does_not_exist"))
    else
      post = post.as_json(include: { user: { only: %i[name id organization_id] }, categories: { only: %i[id name] } })
      render_json({ post: })
    end
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :is_bloggable, category_ids: [])
    end
end
