class AwstestMailer < ApplicationMailer
  def test_email
    @test_email = params[:test_email] 

    mail(to: ENV['ADMIN_EMAIL'], subject: 'Test email from AWS SES')
  end
end
