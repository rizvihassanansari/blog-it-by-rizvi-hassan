# frozen_string_literal: true

class ReportsJob
  include Sidekiq::Job

  def perform(user_id, post_slug, pdf_path)
    post = Post.accessible_to(user_id).find_by!(slug: post_slug).includes(:user, :categories)
    content = ApplicationController.render(
      assigns: {
        post:
      },
      template: "posts/pdf/download",
      layout: "pdf"
    )
    pdf_blob = WickedPdf.new.pdf_from_string content
    File.open(pdf_path, "wb") do |f|
      f.write(pdf_blob)
    end
  end
end
