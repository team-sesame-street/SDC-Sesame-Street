function byHelpfulness(a, b) {
  if (a[1].helpfulness < b[1].helpfulness) {
    return 1;
  } if (a[1].helpfulness > b[1].helpfulness) {
    return -1;
  }
  return 0;
}

export default byHelpfulness;
