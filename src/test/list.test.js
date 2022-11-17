const list = [
  { name: 'kim1', age: 20 },
  { name: 'kim2', age: 21 },
  { name: 'kim3', age: 22 },
  { name: 'kim4', age: 23 },
  { name: 'kim5', age: 24 },
];

const newList = list.reduce(
  (acc, curr, index, array) => {
    console.log(acc);
    return { name: curr.name, age: curr.age * 2 };
  },
  { name: '', age: 0 }
);
console.log(newList);
