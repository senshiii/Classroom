module.exports = (status, msg, data) => ({
  status: {
    success: status,
    message: msg,
  },
  data,
});
