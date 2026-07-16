# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { Faker::Book.title }
    description { Faker::Lorem.paragraph }
    is_bloggable { [true, false].sample }
    association :user
    organization { user.organization }
  end
end
