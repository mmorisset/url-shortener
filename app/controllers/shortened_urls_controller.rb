class ShortenedUrlsController < ApplicationController

  respond_to :html

  before_action :build_shortened_url, only: [:index, :create]

  def index
  end

  def create
    @shortened_url.update_attributes(shortened_url_params)
    @shortened_url.save
    respond_with @shortened_url
  end

  def show
  end

  protected

  def build_shortened_url
    @shortened_url = ShortenedUrl.new
  end

  def shortened_url_params
    params.require(:shortened_url).permit(:original_url)
  end
end
