const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatDate(date) {
  const fixedDate = new Date(`${date}`);
  const month = monthsArr[Number(fixedDate.getMonth())];
  const day = fixedDate.getDate();
  const year = fixedDate.getFullYear();

  return `${month} ${day}, ${year}`;
}

export default formatDate;
