# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { Faker::Book.title }
    description { Faker::Lorem.paragraph }
    is_bloggable { [true, false].sample }
    association :user
    organization_id { user.organization }
  end
end
