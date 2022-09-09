var obstacles = [
  [1,4],
  [-1,0],
  [0,-1],
  [2,3],
  [7,4],
  [0,-3],
];
command = P.generate_command(5, 3  , obstacles);
console.log(command);
