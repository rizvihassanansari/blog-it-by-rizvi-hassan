# frozen_string_literal: true

json.posts do
  json.array! @posts do |post|
    json.extract! post,
      :id,
      :slug,
      :title,
      :description,
      :is_bloggable,
      :updated_at,
      :is_published,
      :upvotes,
      :downvotes

    json.user do
      json.extract! post.user,
        :id,
        :name
    end

    json.categories do
      json.array! post.categories do |category|
        json.extract! category,
          :id,
          :name
      end
    end

    vote = @votes[post.id]
    json.vote do
      if vote
        json.extract! vote,
          :id,
          :user_id,
          :vote_type
      end
    end
  end
end

json.total_results @total_results
