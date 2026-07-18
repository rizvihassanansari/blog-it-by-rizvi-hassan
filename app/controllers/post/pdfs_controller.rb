# frozen_string_literal: true

class Post::PdfsController < ApplicationController
  def create
    PdfsJob.perform_async(params[:post_slug], pdf_path)
    render_notice(t("in_progress", action: "Report generation"))
  end

  def download
    if File.exist?(pdf_path)
      send_file(
        pdf_path,
        type: "application/pdf",
        filename: pdf_file_name,
        disposition: "attachment"
      )
    else
      render_json({ not_found: t("not_found") }, :not_found)
    end
  end

  private

    def pdf_path
      @_pdf_path ||= Rails.root.join("tmp/#{pdf_file_name}").to_s
    end

    def pdf_file_name
      "#{params[:post_slug]}.pdf"
    end
end
