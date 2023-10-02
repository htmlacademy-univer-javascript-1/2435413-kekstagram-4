function CheckLine(string, length)
{
  if (string.length <= length)
  {
    return true;
  }

  return false;
}

function CheckPalindrome(string)
{
  string = string.toLowerCase().replaceAll(' ', '');
  if (string === string.split('').reverse().join(''))
  {
    return true;
  }

  return false;
}

function FindNumber(string)
{
  string = String(string);
  let result = '';

  for (let i = 0; i < string.length; i++)
  {
    if (!(isNaN(parseInt(string[i], 10))))
    {
      result += string[i];
    }
  }

  if (result === '')
  {
    return NaN;
  }

  return parseInt(result, 10);
}

CheckLine('hello', 5);
CheckPalindrome('Лёша на полке клопа нашёл ');
FindNumber('2023 год');
