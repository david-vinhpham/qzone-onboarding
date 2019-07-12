export default function truncateText(text) {
  return text.length > 20 ? `${text.slice(0, 20)}...` : text;
};
