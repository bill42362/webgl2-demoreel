// getRandomNumber.js

const getRandomNumber = ({ Max, Min }) => {
  return Math.floor(Math.random() * (Max - Min) + Min);
};

export default getRandomNumber;
