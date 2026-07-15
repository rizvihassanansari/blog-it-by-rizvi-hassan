# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = create(:category)
  end

  def test_category_name_should_not_be_empty_and_saved
    @category.name = ""
    assert_not @category.save
    assert_includes @category.errors.full_messages, "Name can't be blank"
  end

  def test_category_name_should_be_unique
    @category.save!

    test_category = @category.dup
    assert_not test_category.valid?

    assert_includes test_category.errors.full_messages, "Name has already been taken"
  end
end
