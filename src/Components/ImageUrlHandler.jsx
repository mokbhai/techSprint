const getImageUrl = (img) => {
  if (img.file && img.file.startsWith("/")) return `${URL}${img.file}`;
  if (img.file && img.file.startsWith("http")) return `${img.file}`;
  if (img._id) return `${URL}/api/file/view/${img._id}`;
  return `${URL}/api/file/view/${img}`;
};

export default getImageUrl;
