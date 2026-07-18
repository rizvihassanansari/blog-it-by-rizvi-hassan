# frozen_string_literal: true

class PdfsJob
  include Sidekiq::Job

  def perform(user_id, post_slug, pdf_path)
    post = Post.accessible_to(user_id).includes(:user, :categories).find_by!(slug: post_slug)
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
    puts "DUBBING - GENERATED PDF"
  end
end
