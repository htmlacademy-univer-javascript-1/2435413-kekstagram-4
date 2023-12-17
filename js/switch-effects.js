const Effect = {
  NONE: {
    style: '',
    class: 'effects__preview--none',
    unit: ''
  },
  CHROME: {
    style: 'grayscale',
    class: 'effects__preview--chrome',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  SEPIA: {
    style: 'sepia',
    class: 'effects__preview--sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  MARVIN: {
    style: 'invert',
    class: 'effects__preview--marvin',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  PHOBOS: {
    style: 'blur',
    class: 'effects__preview--phobos',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  HEAT: {
    style: 'brightness',
    class: 'effects__preview--heat',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const DEFAULT_EFFECT = 'NONE';

const form = document.querySelector('.img-upload__overlay');
const preview = form.querySelector('.img-upload__preview');
const slidersContainer = form.querySelector('.img-upload__effect-level');
const effectsContainer = form.querySelector('.img-upload__effects');
const slider = slidersContainer.querySelector('.effect-level__slider');
const value = slidersContainer.querySelector('.effect-level__value');

let nameEffect = 'NONE';
let effect = Effect[nameEffect];

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
  if (nameEffect === DEFAULT_EFFECT) {
    preview.style.filter = '';
  } else {
    preview.style.filter = `${Effect[nameEffect].STYLE}(${value.value}${Effect[nameEffect].UNIT})`;
  }
};

const onEffectsContainerClick = (evt) => {
  preview.classList.remove(effect.CLASS);

  if (evt.target.value !== undefined) {
    nameEffect = evt.target.value.toUpperCase();
    effect = Effect[nameEffect];

    if (nameEffect === DEFAULT_EFFECT) {
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

export const removeClickEffectsContainer = () => effectsContainer.removeEventListener('click', onEffectsContainerClick);
