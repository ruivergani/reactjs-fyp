function random(max) {
  return Math.round(Math.random() * 1000) % max;
}
const FirstWords = [
  "apple", "banana", "cherry", "date", "fig", "grape", "honeydew", "kiwi", "lemon", "mango",
  "orange", "pear", "quince", "raspberry", "strawberry", "tangerine", "watermelon"
];
const Colors = [
  "red", "yellow", "blue", "green", "pink", "brown", "purple", "gray", "white", "black", "orange"
];
const LastWords = [
  "adventure", "beauty", "creativity", "discovery", "elegance", "freedom", "happiness", "imagination", "joy",
  "knowledge", "laughter", "mystery", "passion", "serenity", "transformation", "victory", "wonder"
];

const buildData = function (count) {
  let nextId = 0;
  const data = new Array(count);
  for (let i = 0; i < count; i++) {
    data[i] = {
      id: nextId++,
      value: `${FirstWords[random(FirstWords.length)]} ${Colors[random(Colors.length)]} ${LastWords[random(LastWords.length)]}`,
      recentlyUpdated: false,
    };
  }
  return data;
};

export default buildData;