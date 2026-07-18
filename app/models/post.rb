# frozen_string_literal: true

class Post < ApplicationRecord
  scope :accessible_to, ->(user_id) { where("user_id = ?", user_id) }
  MAX_TITLE_LENGTH = 125
  MAX_DESCRIPTION_LENGTH = 10000
  BLOGGABLE_THRESHOLD = 2

  belongs_to :user
  belongs_to :organization
  has_and_belongs_to_many :categories, join_table: :categories_posts
  has_many :votes, dependent: :destroy
  has_many :voters, through: :votes, source: :user

  validates :title,
    presence: true,
    length: { maximum: MAX_TITLE_LENGTH }
  validates :description,
    presence: true,
    length: { maximum: MAX_DESCRIPTION_LENGTH }
  validates :slug, uniqueness: true
  validates_inclusion_of :is_bloggable, in: [true, false]
  validates_inclusion_of :is_published, in: [true, false]
  validate :slug_not_changed

  before_create :set_slug

  private

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_post_slug = Post.where(
        regex_pattern,
        "^#{title_slug}$|^#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_post_slug.present?
        slug_count = latest_post_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, i18n.t("post.slug.immutable"))
      end
    end
end
