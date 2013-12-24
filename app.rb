require 'rubygems'
require 'sinatra/base'
require 'haml'
require 'mail'

class SinatraBootstrap < Sinatra::Base
  require './helpers/app_helpers'

  Mail.defaults do
    delivery_method :smtp, { :address   => "smtp.sendgrid.net",
                             :port      => 587,
                             :domain    => "siyelo.com",
                             :user_name => ENV['SENDGRID_USERNAME'],
                             :password  => ENV['SENDGRID_PASSWORD'],
                             :authentication => 'plain',
                             :enable_starttls_auto => true }
  end


  get '/' do
    haml :index
  end

  get '/hireus' do
    haml :hireus
  end

  post '/hireus' do
    full_name = request.params["full_name"]
    email = request.params["email"]
    phone = request.params["phone"]
    description = request.params["description"]
    budget = request.params["budget"]

    Mail.deliver do
      from "#{email}"
      to "ile@siyelo.com"
      subject "Someone wants to hire us!"
      body "hireus_email"
    end

    mail.deliver
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
