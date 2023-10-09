const checkLine = (string, length) => string.length <= length;

const isPalindrome = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');
  return string === string.split('').reverse().join('');
};

const findNumber = (string) => {
  string = String(string);
  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (!(isNaN(parseInt(string[i], 10)))) {
      result += string[i];
    }
  }

  return result === '' ? NaN : parseInt(result, 10);
};

checkLine('hello', 5);
isPalindrome('ДовОд');
findNumber('007');
