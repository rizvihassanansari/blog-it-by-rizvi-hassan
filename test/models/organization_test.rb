# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
  end

  def test_organization_name_should_not_be_empty_and_saved
    @organization.name = ""
    assert_not @organization.save
    assert_includes @organization.errors.full_messages, "Name can't be blank"
  end
end
