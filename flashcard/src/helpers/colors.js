const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "geekblue",
  "purple",
];

export const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
