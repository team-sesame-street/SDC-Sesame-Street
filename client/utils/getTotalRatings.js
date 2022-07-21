export default function getTotalRatings(ratings) {
  const ratingsArray = Object.values(ratings);
  return ratingsArray.reduce((prevVal, currVal) => Number(prevVal) + Number(currVal));
}
