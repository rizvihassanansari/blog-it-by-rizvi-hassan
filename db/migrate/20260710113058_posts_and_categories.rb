# frozen_string_literal: true

class PostsAndCategories < ActiveRecord::Migration[8.0]
  def change
    create_table :post_categories, id: false do |t|
      t.references :post, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
    end
  end
end
