export const getRandomIntegerFromRange = (start, end) =>
  Math.ceil(Math.random() * (end - start + 1)) + start - 1;

export const getRandomInteger = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

export const createRandomIntFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomIntegerFromRange(min, max);

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomIntegerFromRange(min, max);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
};

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
