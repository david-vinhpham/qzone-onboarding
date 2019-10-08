export const formatTimeToString = (time) => {
  return time < 10 ? `0${time}` : time;
};
