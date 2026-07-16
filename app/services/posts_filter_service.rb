# frozen_string_literal: true

class PostsFilterService
  attr_reader :initial_relation, :filters

  def initialize(initial_relation, filters = {})
    @initial_relation = initial_relation
    @filters = filters || {}
  end

  def call
    posts = initial_relation
    posts = filter_by_title(posts)
    posts = filter_by_category(posts)
    posts = filter_by_status(posts)
    posts
  end

  private

    def filter_by_title(posts)
      if filters[:title].present?
        posts.where("title ILIKE ?", "%#{filters[:title]}%")
      else
        posts
      end
    end

    def filter_by_category(posts)
      if filters[:category_id].present?
        posts.where(category_id: filters[:category_id])
      else
        posts
      end
    end

    def filter_by_status(posts)
      if filters[:status].present?
        posts.where(status: filters[:status])
      else
        posts
      end
    end
end
