module.exports = function () {
  return {
    myapikey: process.env.API_KEY || "development",
  };
};
