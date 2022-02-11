const makeImage = (poster?: string, width?: string) => {
  return `https://image.tmdb.org/t/p/${width ? width : "w500"}/${poster}`;
};

export default makeImage;

export const playVideo = (key: string) => {
  return `https://www.youtube.com/embed/${key}`;
};
