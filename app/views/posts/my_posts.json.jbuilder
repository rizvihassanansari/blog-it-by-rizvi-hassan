# frozen_string_literal: true

json.posts do
  json.array! @posts do |post|
    json.extract! post,
      :id,
      :slug,
      :title,
      :is_bloggable,
      :slug,
      :updated_at,
      :is_published

    json.categories do
      json.array! post.categories do |category|
        json.extract! category,
          :id,
          :name
      end
    end
  end
end
