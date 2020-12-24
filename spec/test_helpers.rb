module TestHelpers
  def help
    3.times { p 'HELP !' }
  end

  def create_test_image
    file = Rails.root.join('app', 'assets', 'images', 'Techno.jpg')

    image = ActiveStorage::Blob.create_after_upload!(
      io: File.open(file, 'rb'),
      filename: 'Techno.jpg',
      content_type: 'image/jpg' # Or figure it out from `name` if you have non-JPEGs
    ).signed_id
  end
end
