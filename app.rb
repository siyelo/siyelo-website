require 'rubygems'
require 'sinatra/base'
require 'haml'
require 'mail'
require 'rack-flash'
require './helpers/app_helpers'
require './emails/email_sender'
require './emails/email_validator'

class SinatraBootstrap < Sinatra::Base
  enable :sessions
  use Rack::Flash

  if ENV['RACK_ENV'] == 'production'
    mail_settings = { :address   => "smtp.sendgrid.net",
      :port      => 587,
      :domain    => "siyelo.com",
      :user_name => ENV['SENDGRID_USERNAME'],
      :password  => ENV['SENDGRID_PASSWORD'],
      :authentication => 'plain',
      :enable_starttls_auto => true }

    Mail.defaults do
      delivery_method :smtp, mail_settings
    end
  else
    Mail.defaults do
      delivery_method :sendmail
    end
  end

  get '/' do
    haml :index
  end

  get '/hire-us' do
    haml :hireus, layout: :page
  end

  get '/jobs' do
    haml :jobs, layout: :page
  end

  get '/internships/full-stack' do
    haml :fullstack, layout: :page
  end

  get '/clients/internet-solutions' do
    haml :is, layout: :page
  end

  get '/clients/talented-africa' do
    haml :tad, layout: :page
  end

  get '/clients/clinton-health-access-initiative' do
    haml :chai, layout: :page
  end

  get '/clients/cooco' do
    haml :eos, layout: :page
  end

  get '/clients/mad-mimi' do
    haml :mm, layout: :page
  end

  post '/hire-us' do
    unless EmailValidator.validate(request.params)
      flash[:error] = 'Your email form is invalid!'
      redirect '/hire-us'
    end

    EmailSender.deliver_hire_email(request.params)

    flash[:notice] = 'Thank you! Your email has been sent.'
    redirect '/'
  end

  post '/jobs' do
    unless EmailValidator.validate(request.params)
      flash[:error] = 'Please fill in all of the fields and resubmit your application.'
      redirect '/jobs'
    end

    EmailSender.deliver_job_application(request.params)

    flash[:notice] = 'Your application has been submitted. Thank you!'
    redirect '/'
  end

  post '/internships/full-stack' do
    unless EmailValidator.validate(request.params)
      flash[:error] = 'Please fill in all of the fields and resubmit your application.'
      redirect '/internships/full-stack'
    end

    EmailSender.deliver_intern_application(request.params)

    flash[:notice] = 'Your application has been submitted. Thank you!'
    redirect '/'
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
