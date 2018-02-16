class Message < ApplicationRecord
  validates :title, presence: true
  
  def self.search_by_title(key)
    where("title LIKE :title", {title: "#{key}%"})
  end
end
