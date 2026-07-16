json.users do
  json.array! @users do |user|
    json.extract! user,
      :id,
      :name,
      :email,
      :organization_id
  end
end
