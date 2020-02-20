const getFileMetadata = file => {
  return new Promise((resolve, reject) => {
    const {originalname: name, mimetype: type, size} = file;
    const fileMetadata = {
      name,
      type,
      size
    };
    resolve(fileMetadata);
  });
};

module.exports = {
  getFileMetadata: getFileMetadata
};
