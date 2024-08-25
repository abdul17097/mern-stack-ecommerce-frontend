const url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUD_NAME
}/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mernecom");
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data.secure_url;
};

export default uploadImage;
