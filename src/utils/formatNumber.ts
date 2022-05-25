export default function formatNumber(num: number) {
  return num >= 1e3 && num < 1e4
    ? (num / 1e3).toFixed(1) + "k"
    : num >= 1e4
    ? (num / 1e4).toFixed(1) + "w"
    : num;
}
