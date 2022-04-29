let obj = {
  x: 1,
  y: 2
}
let arr = [];

let a = Object.keys(obj);
let b = Object.values(obj);

arr.push(a);
arr.push(b);

console.log(arr);