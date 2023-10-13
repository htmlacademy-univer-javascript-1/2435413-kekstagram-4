const COUNTSPHOTOS = 25;
const NAMES = ['Masha', 'Sasha', 'Pasha', 'Dasha', 'Vasya', 'Popa'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const listPhotos = [];

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

const generatePhotoId = createRandomIntFromRangeGenerator(1, 25);
const generatePhotoUrl = createRandomIntFromRangeGenerator(1, 25);
const generatePhotoLikes = createRandomIntFromRangeGenerator(15, 200);
const generateRandomInteger = getRandomInteger();

const generateDataForPhoto = (countPhotos) => {

  for (let i = 0; i < countPhotos; i++) {
    listPhotos.push({
      id: generatePhotoId(),
      url: `photos/${generatePhotoUrl()}.jpg`,
      description: 'Хайп',
      likes: generatePhotoLikes(),
      commets: {
        id: generateRandomInteger(),
        avatar: `img/avatar-${getRandomIntegerFromRange(1, 6)}.svg`,
        message: MESSAGES[getRandomIntegerFromRange(0, MESSAGES.length - 1)],
        name: NAMES[getRandomIntegerFromRange(0, NAMES.length - 1)]
      }
    });
  }
};

generateDataForPhoto(COUNTSPHOTOS);
