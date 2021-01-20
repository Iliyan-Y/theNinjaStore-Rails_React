export const imageOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 800,
};

export const validateProductForm = (name, description, price, image) => {
  if (name.length < 3) {
    alert('Title must be at least 3 characters long');
    return [false, 'title'];
  }

  if (description.length < 3) {
    alert('Description must be at least 3 characters long');
    return [false, 'description'];
  }

  if (price == '') {
    alert('Price cant be blank');
    return [false, 'price'];
  } else if (price < 1) {
    alert('Price must be greater then 0');
    return [false, 'price'];
  }

  if (image == undefined) {
    alert('Please add cover image');
    return [false, 'image'];
  }

  return [true, 'default'];
};

export const validateFileType = (file) => {
  if (
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/jpg'
  ) {
    return true;
  }

  return false;
};

export const validateGallery = (images) => {
  let allFiles = [];
  [...images].map((photo) => {
    if (!validateFileType(photo)) {
      alert('File can be only image type');
      return;
    }

    allFiles.push(photo);
  });
  return allFiles;
};

export function validateOrderForm(name, email, phone, user) {
  if (name.length < 3 || phone.length < 5) {
    alert('Please fill in all fields');
    return false;
  }

  if (!user && email.length < 5) {
    alert('Please add valid email');
    return false;
  }

  return true;
}
