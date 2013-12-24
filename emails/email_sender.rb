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
