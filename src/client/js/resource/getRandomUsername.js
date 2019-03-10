// getRandomUsername.js
'use strict';

const getRandomUsername = ({ paddingNumber = 0 } = {}) => {
  const adjective = adjectivePool[Math.floor(Math.random() * 26)];
  const name = namePool[Math.floor(Math.random() * 26)];
  const padding = Math.floor(Math.random() * Math.pow(10, paddingNumber));
  return `${adjective}${name}${padding}`.replace(/0*$/gi, '').toLowerCase();
};

const adjectivePool = [
  'White',
  'Lone',
  'Ravenous',
  'Ancient',
  'Magic',
  'Ebony',
  'Dark',
  'Savage',
  'Regal',
  'Rogue',
  'Scarlet',
  'Fierce',
  'Alpha',
  'Beautiful',
  'Blood',
  'Moon',
  'Loyal',
  'Scarred',
  'Grey',
  'Mystic',
  'Prime',
  'Graceful',
  'Majestic',
  'Wild',
  'Vengeful',
  'Cruel',
];

const namePool = [
  'Hunter',
  'Demon',
  'Howler',
  'Rain',
  'Red',
  'Shadow',
  'Storm',
  'Beast',
  'Bane',
  'Digger',
  'Horrid',
  'Fang',
  'Claw',
  'Wolf',
  'Crescent',
  'Paw',
  'Lupus',
  'Fire',
  'Temptress',
  'Warrior',
  'Rage',
  'Thron',
  'Moon',
  'Lupe',
  'Vixen',
  'Omega',
];

export default getRandomUsername;
