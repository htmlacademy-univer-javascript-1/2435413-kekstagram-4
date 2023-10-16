const COUNT_PHOTOS = 25;
const MIN_LIKES = 15;
const MIN_AVATAR = 1;
const MAX_LIKES = 200;
const MAX_AVATAR = 6;

const NAMES = ['Masha', 'Sasha', 'Pasha', 'Dasha', 'Vasya', 'Popa'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const getRandomIntegerFromRange = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

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
  const generatePhotoLikes = createRandomIntFromRangeGenerator(MIN_LIKES, MAX_LIKES);
  const generateRandomInteger = getRandomInteger();

  return new Array(countPhotos).fill('').map((_, index) => (
    {
      id: index,
      url: `photos/${index}.jpg`,
      description: 'Хайп',
      likes: generatePhotoLikes(),
      commets: {
        id: generateRandomInteger(),
        avatar: `img/avatar-${getRandomIntegerFromRange(MIN_AVATAR, MAX_AVATAR)}.svg`,
        message: MESSAGES[index % MESSAGES.length],
        name: NAMES[index % NAMES.length]
      }
    }));
};

console.log(generateDataForPhoto(COUNT_PHOTOS));
