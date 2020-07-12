/**
 * File Name: hash.js
 * Author: Nicholas Lin
 * Date: 7/11/20
 * Description: Gets hash parameters from url
 */

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
//window.location.hash = "";

export default hash;
