class EmailValidator
  class << self
    def validate(params)
      ! params.values.any?{|item| item.blank? }
    end
  end
end

