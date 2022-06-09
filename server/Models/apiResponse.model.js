function apiResponseModel(response, httpCode = 200) {
  this.response = response;
  this.httpCode = httpCode;
}
exports.apiResponseModel = apiResponseModel;