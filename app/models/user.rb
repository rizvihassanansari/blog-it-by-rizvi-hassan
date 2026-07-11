# frozen_string_literal: true

class User < ApplicationRecord
  belongs_to :organization
  has_many :posts

  validates :name, presence: true
end
