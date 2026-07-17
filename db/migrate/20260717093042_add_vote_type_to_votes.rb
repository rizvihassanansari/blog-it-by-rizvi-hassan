# frozen_string_literal: true

class AddVoteTypeToVotes < ActiveRecord::Migration[8.0]
  def change
    add_column :votes, :vote_type, :integer

    add_index :votes, [:user_id, :post_id], unique: true
  end
end
