# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
  end

  def test_user_should_not_be_valid_and_saved_without_name
    @user.name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Name can't be blank"
  end

  def test_name_should_be_of_valid_length
    @user.name = "a" * (User::MAX_NAME_LENGTH + 1)
    assert @user.invalid?
  end

  def test_user_should_not_be_valid_and_saved_without_email
    @user.email = ""
    assert_not @user.valid?
    assert_not @user.save
    assert_includes @user.errors.full_messages, "Email can't be blank"
  end

  def test_user_should_not_be_valid_and_saved_if_email_not_unique
    @user.save!

    test_user = @user.dup
    assert_not test_user.valid?

    assert_includes test_user.errors.full_messages, "Email has already been taken"
  end

  def test_email_should_be_saved_in_lowercase
    uppercase_email = "SAM@EXAMPLE.COM"
    @user.email = uppercase_email
    @user.save!

    assert_equal uppercase_email.downcase, @user.email
  end

  def test_user_should_not_be_saved_without_password
    @user.password = nil
    assert_not @user.valid?
    assert_not @user.save
    assert_includes @user.errors.full_messages, "Password can't be blank"
  end

  def user_should_not_be_saved_without_password_confirmation
    @user.password_confirmation = nil
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password confirmation can't be blank"
  end

  def test_user_should_have_matching_password_and_password_confirmation
    @user.password_confirmation = "#{@user.password}-random"
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password confirmation doesn't match Password"
  end

  def test_user_should_have_unique_auth_token
    @user.save!
    second_user = User.create!(
      name: "Oliver Smith", email: "oliver@example.com", password: "welcome",
      password_confirmation: "welcome", organization: @user.organization)

    assert_not_same @user.authentication_token, second_user.authentication_token
  end
end
