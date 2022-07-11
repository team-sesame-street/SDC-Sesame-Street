function convertImageToBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      res(reader.result);
    };
  });
}

export default convertImageToBase64;
