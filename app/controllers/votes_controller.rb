# frozen_string_literal: true

class VotesController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    Vote.create!(user: current_user, post: @post, vote_type: params[:vote_type].to_sym)
    render_notice(t("vote_added"))
  end

  def destroy
    vote = Vote.find(params[:id])
    vote.destroy!
    render_notice(t("vote_removed"))
  end
end
