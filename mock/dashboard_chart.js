function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [30, 50, 44, 70, 80, 30];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
