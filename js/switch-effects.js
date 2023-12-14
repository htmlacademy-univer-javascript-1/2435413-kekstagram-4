const Effects = {
  'none': {
    STYLE: '',
    CLASS: 'effects__preview--none',
    UNIT: ''
  },
  'chrome': {
    STYLE: 'grayscale',
    CLASS: 'effects__preview--chrome',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    UNIT: ''
  },
  'sepia': {
    STYLE: 'sepia',
    CLASS: 'effects__preview--sepia',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    UNIT: ''
  },
  'marvin': {
    STYLE: 'invert',
    CLASS: 'effects__preview--marvin',
    MIN: 0,
    MAX: 100,
    STEP: 1,
    UNIT: '%'
  },
  'phobos': {
    STYLE: 'blur',
    CLASS: 'effects__preview--phobos',
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    UNIT: 'px'
  },
  'heat': {
    STYLE: 'brightness',
    CLASS: 'effects__preview--heat',
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    UNIT: ''
  }
};

const form = document.querySelector('.img-upload__overlay');
const preview = form.querySelector('.img-upload__preview');
const slidersContainer = form.querySelector('.img-upload__effect-level');
export const effectsContainer = form.querySelector('.img-upload__effects');
const slider = slidersContainer.querySelector('.effect-level__slider');
const value = slidersContainer.querySelector('.effect-level__value');

let nameEffect = 'none';
let effect = Effects[nameEffect];

const updateSlider = (min, max, step) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
    connect: 'lower'
  });
};

const onSliderUpdate = () => {
  value.value = slider.noUiSlider.get();
  if (nameEffect === 'none') {
    preview.style.filter = '';
  } else {
    preview.style.filter = `${Effects[nameEffect].STYLE}(${value.value}${Effects[nameEffect].UNIT})`;
  }
};

export const onEffectsContainerClick = (evt) => {
  preview.classList.remove(effect.CLASS);

  if (evt.target.value !== undefined) {
    nameEffect = evt.target.value;
    effect = Effects[nameEffect];

    if (nameEffect === 'none') {
      slider.classList.add('hidden');
      slidersContainer.classList.add('hidden');
    }
    else {
      updateSlider(effect.MIN, effect.MAX, effect.STEP);

      slider.classList.remove('hidden');
      slidersContainer.classList.remove('hidden');
    }

    slider.noUiSlider.on('update', onSliderUpdate);
    preview.classList.add(effect.CLASS);
  }
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 0,
  },
  start: 0,
  step: 0,
});

export const switchEffects = () => {
  preview.classList.remove(effect.CLASS);
  preview.style.filter = '';

  slider.classList.add('hidden');
  slidersContainer.classList.add('hidden');

  effectsContainer.addEventListener('click', onEffectsContainerClick);
};
