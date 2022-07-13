export default function randomId() {
  return Date.now() * Math.random() + new Date().getTime();
}
