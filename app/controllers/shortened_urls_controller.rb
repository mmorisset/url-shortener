class ShortenedUrlsController < ApplicationController

  before_action :build_shortened_url, only: [:index, :create]
  before_action :set_shortened_urls, only: [:index, :create]
  before_action :find_shortened_url, only: [:show, :destroy]

  def create
    @shortened_url.update(shortened_url_params)
    respond_with @shortened_url
  end

  def show
    @activity = @shortened_url.last_hour_activity_by_minute
  end

  def destroy
    @shortened_url.destroy
    respond_with @shortened_url
  end

  def redirect
    @shortened_url = ShortenedUrl.find_by(token: params[:token])
    if @shortened_url
      AnalyticsEvents::Service.track_event(:visited_url, shortened_url_token: @shortened_url.token)
    end
    redirect_to @shortened_url&.original_url || '/', status: :moved_permanently
  end

  protected

  def build_shortened_url
    @shortened_url = ShortenedUrl.new
  end

  def find_shortened_url
    @shortened_url = ShortenedUrl.find(params[:id])
  end

  def set_shortened_urls
    @shortened_urls = ShortenedUrl.all
  end

  def shortened_url_params
    params.require(:shortened_url).permit(:original_url)
  end
end
