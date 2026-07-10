# frozen_string_literal: true

class AddForeignKeyToUser < ActiveRecord::Migration[8.0]
  def change
    add_foreign_key :users, :organizations, column: :organization_id
  end
end
