export const isEscapeKey = (evt) => evt.key === 'Escape';

export const appendCloneInBody = (clone) => {
  document.body.appendChild(clone);
  clone.classList.add('hidden');
};

const getPhotoRank = (photo) => photo.comments.length;

export const sortByComments = (photoA, photoB) => getPhotoRank(photoB) - getPhotoRank(photoA);

export const sortRandom = () => Math.random() - 0.5;

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
