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
        posts.where("title LIKE ?", "%#{filters[:title]}%")
      else
        posts
      end
    end

    def filter_by_category(posts)
      if filters[:categories].present?
        posts.where(categories: { id: filters[:categories] })
      else
        posts
      end
    end

    def filter_by_status(posts)
      unless filters[:status].nil?
        posts.where(is_bloggable: filters[:status])
      else
        posts
      end
    end
end
