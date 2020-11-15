class User < ApplicationRecord
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def self.generate_token(email)
    exp = 1.hours.from_now.to_i
    #exp = Time.now.to_i - 60
    payload = {user: email, exp: exp}
    JWT.encode(payload, "SuperSecret")
  end

  def self.decode(token)
    body = JWT.decode(token, "SuperSecret")[0]
    HashWithIndifferentAccess.new body
  rescue
    false
  end
end
