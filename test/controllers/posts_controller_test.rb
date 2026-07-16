# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  test "index returns posts with categories in json" do
    organization = Organization.create!(name: "Test Organization")
    user = User.create!(
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      password_confirmation: "password123",
      organization:
    )
    category = Category.create!(name: "Ruby")
    post = Post.create!(
      title: "Hello world",
      description: "A sample post",
      is_bloggable: true,
      user:,
      organization:,
      category_ids: [category.id]
    )

    get posts_url(format: :json), headers: {
      "X-Auth-Email" => user.email,
      "X-Auth-Token" => user.authentication_token
    }

    assert_response :success

    response_json = JSON.parse(response.body)
    assert_equal 1, response_json["total_results"]
    assert_equal post.id, response_json["posts"].first["id"]
    assert_equal "Ruby", response_json["posts"].first["categories"].first["name"]
  end
end
