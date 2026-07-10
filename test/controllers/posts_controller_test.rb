# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  test "index returns posts in descending order of creation date" do
    older_post = Post.create!(title: "Older Post", description: "Older description", is_bloggable: true)
    newer_post = Post.create!(title: "Newer Post", description: "Newer description", is_bloggable: true)

    older_post.update_column(:created_at, 2.days.ago)
    newer_post.update_column(:created_at, 1.day.ago)

    get posts_url

    assert_response :success
    post_ids = response.parsed_body.fetch("posts").map { |post| post["id"] }
    assert_equal [newer_post.id, older_post.id], post_ids
  end
end
