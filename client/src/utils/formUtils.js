export default (body) => {
  const formData = new FormData();
  for (let key of Object.keys(body)) {
    formData.append(key, body[key]);
  }
  return formData;
};
