# frozen_string_literal: true

class AddOrganizationToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :organization_id, :integer
    add_foreign_key :posts, :organizations, column: :organization_id
  end
end
