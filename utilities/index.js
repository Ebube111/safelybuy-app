module.exports.formatErrorResponse = (array) => {
  let error = '';
  array.map((value, key) => {
    error = error + value + '\n';
  });
  return error;
};
