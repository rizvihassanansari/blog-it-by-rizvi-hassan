# frozen_string_literal: true

class AddIsPublishedToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :is_published, :boolean, default: false
  end
end
