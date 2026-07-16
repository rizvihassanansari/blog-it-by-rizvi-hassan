# frozen_string_literal: true

json.post do
  json.extract! @post,
    :id,
    :slug,
    :title,
    :description,
    :is_bloggable,
    :created_at,
    :updated_at,
    :organization_id

  json.user do
    json.extract! @post.user,
      :id,
      :name,
      :email
  end

  json.categories do
    json.array! @post.categories do |category|
      json.extract! category,
        :id,
        :name
    end
  end
end
