const COUNT_PHOTOS = 25;
const DESCRIPTION = 'Хайп';
const avatarId = {
  MIN: 1,
  MAX: 6
};
const likes = {
  MIN: 15,
  MAX: 200
};

const NAMES = ['Masha', 'Sasha', 'Pasha', 'Dasha', 'Vasya', 'Popa'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const getRandomIntegerFromRange = (start, end) =>
  Math.ceil(Math.random() * (end - start + 1)) + start - 1;

const getRandomInteger = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const createRandomIntFromRangeGenerator = (min, max) => {
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

const generateDataForPhoto = (countPhotos) => {
  const generatePhotoLikes = createRandomIntFromRangeGenerator(likes.MIN, likes.MAX);
  const generateRandomInteger = getRandomInteger();

  return new Array(countPhotos).fill('').map((_, index) => (
    {
      id: index,
      url: `photos/${index}.jpg`,
      description: DESCRIPTION,
      likes: generatePhotoLikes(),
      commets: {
        id: generateRandomInteger(),
        avatar: `img/avatar-${getRandomIntegerFromRange(avatarId.MIN, avatarId.MAX)}.svg`,
        message: MESSAGES[index % MESSAGES.length],
        name: NAMES[index % NAMES.length]
      }
    }));
};

generateDataForPhoto(COUNT_PHOTOS);
