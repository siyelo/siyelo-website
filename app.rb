require 'rubygems'
require 'sinatra/base'
require 'haml'
require 'mail'
require 'rack-flash'

class SinatraBootstrap < Sinatra::Base
  require './helpers/app_helpers'
  enable :sessions
  use Rack::Flash


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
    unless EmailValidator.validate!(request.params)
      flash[:error] = 'Your email form is invalid!'
      redirect '/hireus'
    end

    EmailSender.deliver!(request.params)

    flash[:notice] = 'Your email has been sent!'
    redirect '/'
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end

class EmailValidator
  class << self
    def validate(params)
      ! params.values.any?{|item| item.blank? }
    end
  end
end

class EmailSender
  class << self
    def deliver!(params)
      full_name = params["full_name"]
      email = params["email"]
      phone = params["phone"]
      description = params["description"]
      budget = params["budget"]

      mail_body = %Q(
      Hey Glenn!

      We got contacted by #{full_name}.
      They'd describe their project as:
      #{description}

      Their budget is #{budget}.
      You can contact them by phone on #{phone}.
      Or by email on #{email}.

      Cheers!)

      Mail.deliver do
        from "#{email}"
        to "ile@siyelo.com"
        subject "Someone wants to hire us!"
        body mail_body
      end
    end
  end
end
