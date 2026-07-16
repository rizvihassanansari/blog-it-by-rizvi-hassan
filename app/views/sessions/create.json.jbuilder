# frozen_string_literal: true

json.user do
  json.extract! @user,
    :id,
    :name,
    :email,
    :authentication_token
end
