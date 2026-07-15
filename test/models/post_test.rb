# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @post = create(:post)
  end

  def test_post_title_cannot_be_empty_and_saved
    @post.title = ""
    assert @post.invalid?
    assert_not @post.save
    assert_includes @post.errors.full_messages, "Title can't be blank"
  end

  def test_post_title_should_be_of_valid_length
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 2)
    assert @post.invalid?
  end

  def test_post_description_cannot_be_empty_and_saved
    @post.description = ""
    assert @post.invalid?
    assert_not @post.save
    assert_includes @post.errors.full_messages, "Description can't be blank"
  end

  def test_post_description_should_be_of_valid_length
    @post.description = "a" * (Post::MAX_DESCRIPTION_LENGTH + 1)
    assert @post.invalid?
    assert_not @post.save
  end

  def test_post_slug_is_parameterized_title
    title = @post.title
    @post.save!
    assert_equal title.parameterize, @post.slug
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_two_worded_titles
    first_post = create(:post, title: "test post")
    second_post = create(:post, title: "test post")

    assert_equal "test-post", first_post.slug
    assert_equal "test-post-2", second_post.slug
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_hyphenated_titles
    first_post = create(:post, title: "test-post")
    second_post = create(:post, title: "test-post")

    assert_equal "test-post", first_post.slug
    assert_equal "test-post-2", second_post.slug
  end

  def test_slug_generation_for_posts_having_titles_one_being_prefix_of_the_other
    first_post = create(:post, title: "fishing")
    second_post = create(:post, title: "fish")

    assert_equal "fishing", first_post.slug
    assert_equal "fish", second_post.slug
  end

  def test_creates_multiple_posts_with_unique_slug
    posts = create_list(:post, 10)
    slugs = posts.pluck(:slug)

    assert_equal slugs.uniq, slugs
  end

  def test_post_is_bloggable_must_be_true_or_false
    @post.is_bloggable = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Is bloggable is not included in the list"
  end

  def test_post_should_not_be_valid_without_user
    @post.user = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "User must exist"
  end
end
