import { getRandomInteger, getRandomIntegerFromRange, createRandomIntFromRangeGenerator } from './util.js';

const DESCRIPTION = 'Хайп';
const AvatarId = {
  MIN: 1,
  MAX: 6
};
const CountLike = {
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


export const generateDataForPhoto = (countPhotos) => {
  const generatePhotoLikes = createRandomIntFromRangeGenerator(CountLike.MIN, CountLike.MAX);
  const generateRandomInteger = getRandomInteger();

  return new Array(countPhotos).fill('').map((_, index) => (
    {
      id: index,
      url: `photos/${index}.jpg`,
      description: DESCRIPTION,
      likes: generatePhotoLikes(),
      commets: {
        id: generateRandomInteger(),
        avatar: `img/avatar-${getRandomIntegerFromRange(AvatarId.MIN, AvatarId.MAX)}.svg`,
        message: MESSAGES[index % MESSAGES.length],
        name: NAMES[index % NAMES.length]
      }
    }));
};
