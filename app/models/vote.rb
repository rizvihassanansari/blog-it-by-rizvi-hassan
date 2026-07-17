# frozen_string_literal: true

class Vote < ApplicationRecord
  enum :vote_type, {
    upvote: 1,
    downvote: 2
  }

  belongs_to :user
  belongs_to :post

  validates :user_id, uniqueness: { scope: :post_id }

  after_create :increment_post_votes
  after_destroy :decrement_post_votes

  private

    def increment_post_votes
      if upvote?
        post.increment!(:upvotes)
      elsif downvote?
        post.increment!(:downvotes)
      end
      update_bloggable!
    end

    def decrement_post_votes
      if upvote?
        post.decrement!(:upvotes)
      elsif downvote?
        post.decrement!(:downvotes)
      end
      update_bloggable!
    end

    def update_bloggable!
      if post.upvotes - post.downvotes >= Post::BLOGGABLE_THRESHOLD
        post.update!(is_bloggable: true)
      else
        post.update!(is_bloggable: false)
      end
    end
end
