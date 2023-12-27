const Effect = {
  NONE: {
    style: '',
    unit: ''
  },
  CHROME: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  SEPIA: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  MARVIN: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  PHOBOS: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  HEAT: {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const DEFAULT_EFFECT = 'NONE';

const form = document.querySelector('.img-upload__overlay');
const preview = form.querySelector('.img-upload__preview img');
const slidersContainer = form.querySelector('.img-upload__effect-level');
const effectsContainer = form.querySelector('.img-upload__effects');
const slider = slidersContainer.querySelector('.effect-level__slider');
const value = slidersContainer.querySelector('.effect-level__value');

let nameEffect = DEFAULT_EFFECT;
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
  value.value = +slider.noUiSlider.get();
  if (nameEffect === DEFAULT_EFFECT) {
    preview.style.filter = '';
  } else {
    preview.style.filter = `${Effect[nameEffect].style}(${value.value}${Effect[nameEffect].unit})`;
  }
};

const onEffectsContainerClick = (evt) => {
  preview.classList.remove(effect.class);

  if (evt.target.value !== undefined) {
    nameEffect = evt.target.value.toUpperCase();
    effect = Effect[nameEffect];

    if (nameEffect === DEFAULT_EFFECT) {
      slider.classList.add('hidden');
      slidersContainer.classList.add('hidden');
    }
    else {
      updateSlider(effect.min, effect.max, effect.step);

      slider.classList.remove('hidden');
      slidersContainer.classList.remove('hidden');
    }

    slider.noUiSlider.on('update', onSliderUpdate);
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
  preview.style.filter = '';

  slider.classList.add('hidden');
  slidersContainer.classList.add('hidden');

  effectsContainer.addEventListener('click', onEffectsContainerClick);
};

export const removeClickEffectsContainer = () => effectsContainer.removeEventListener('click', onEffectsContainerClick);
