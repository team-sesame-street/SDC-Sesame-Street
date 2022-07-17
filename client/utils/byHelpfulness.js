function byHelpfulness(a, b) {
  if (a.helpfulness < b.helpfulness) {
    return 1;
  } if (a.helpfulness > b.helpfulness) {
    return -1;
  }
  return 0;
}

export default byHelpfulness;
