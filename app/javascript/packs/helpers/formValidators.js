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
    return false;
  } else if (price < 1) {
    alert('price must be greater then 0');
    return false;
  }

  if (image == undefined) {
    alert('Please add cover image');
    return false;
  }

  return [true, 'default'];
};
