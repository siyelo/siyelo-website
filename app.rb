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
    @title = "We turn great ideas into great applications"
    @description = "Build your next web/mobile app with an experienced team."
    haml :index
  end

  get '/hire-us' do
    @title = "Hire us for your next project"
    @description = "Our team of designers and developers can turn your idea into an amazing product"
    haml :hireus, layout: :page
  end

  get '/jobs' do
    @title = "Apply for a job"
    @description = "If you're enthusiastic about technology and business, drop us a line."
    haml :jobs, layout: :page
  end

  get '/clients/internet-solutions' do
    @title = "Internet Solutions case study"
    @description = "Need to save costs? Rethinking the way you are doing things? We've helped clients save costs by rapidly replacing their legacy systems."
    haml :is, layout: :page
  end

  get '/clients/talented-africa' do
    @title = "Talented Africa case study"
    @description = "Looking to bring a new web app to market? You need a team to help design, develop and deliver it."
    haml :tad, layout: :page
  end

  get '/clients/clinton-health-access-initiative' do
    @title = "Clinton Health Access Initiative case study"
    @description = "Apps nowadays must be intuitive to use and visually appealing. We can help design and implement responsive and intuitive interfaces."
    haml :chai, layout: :page
  end

  get '/clients/cooco' do
    @title = "Cooco case study"
    @description = "Software projects (and some developers!) are notoriously difficult to manage. But it doesn't have to be that way. Our collaborative approach helped some of our clients to start fresh and really turn things around."
    haml :eos, layout: :page    
  end

  get '/clients/mad-mimi' do
    @title = "Mad Mimi case study"
    @description = "Need to launch new features sooner than your current capacity allows? As an experienced team available at reasonably short notice, we've helped many clients solve this problem."
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

  # start the server if ruby file executed directly
  run! if app_file == $0
end
