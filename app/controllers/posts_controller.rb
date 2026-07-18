# frozen_string_literal: true

class PostsController < ApplicationController
  PAGE_SIZE = 5

  before_action :load_post!, only: %i[show update destroy]

  def index
    page = [params[:page].to_i, 1].max
    category_ids = Array(params[:categories]).map(&:to_i)

    current_user_organization_id = current_user.organization_id

    @posts = category_ids.present? ?
      Post.joins(:categories).where(categories: { id: category_ids }).distinct :
      Post.all

    @posts = @posts
      .includes(:user, :categories)
      .where(organization_id: current_user_organization_id).order(id: :desc)

    @total_results = @posts.count
    @posts = @posts.limit(PAGE_SIZE).offset((page - 1) * PAGE_SIZE)
    @votes = Vote.where(user_id: current_user.id, post_id: @posts.ids).index_by(&:post_id)
    render
  end

  def create
    post = Post.new(post_params)
    post[:user_id] = current_user.id
    post[:organization_id] = current_user.organization_id
    post.save!

    if params.key?(:quiet)
      render_json(post.as_json(only: :updated_at))
    else
      render_notice(t("successfully_created.post"))
    end
  end

  def show
    if @post.user_id != current_user.id && @post.is_published == false
      render_error(t("does_not_exist"))
    else
      render
    end
  end

  def destroy
    @post.destroy!
    if params.key?(:quiet)
      render_json({ deleted: true })
    else
      render_notice(t("successfully_deleted.post")) unless params.key?(:quiet)
    end
  end

  def update
    @post.update(update_params)
    @post.save!

    if params.key?(:quiet)
      render_json(@post.as_json(only: :updated_at))
    else
      render_notice(t("successfully_updated.post"))
    end
  end

  def my_posts
    @posts = current_user.posts.joins(:categories).distinct
    @posts = PostsFilterService.new(@posts, filter_params).call
    render
  end

  def bulk_update
    @posts = Post.where(slug: params[:slugs])
    @posts.update_all(is_published: params[:status])
    render_notice(t("successfully_updated.posts"))
  end

  def bulk_delete
    slugs = params[:slugs]
    puts "DEBUGGING", slugs
    Post.where(slug: params[:slugs]).destroy_all
    render_notice(t("successfully_deleted.posts"))
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :is_published, category_ids: [])
    end

    def update_params
      params.require(:post).permit(:description, :is_published, category_ids: [])
    end

    def filter_params
      params.permit(:title, :status, categories: [])
    end

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end
end
