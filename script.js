class MazeSolver {
  constructor(maze) {
    this.maze = maze;
    this.visited = [];
    for (let i = 0; i < maze.length; i++) {
      this.visited.push([]);
      for (let j = 0; j < maze[i].length; j++) {
        this.visited[i].push(false);
      }
    }
  }

  solve(startRow, startCol, endRow, endCol) {
    let path = [];
    this.dfs(startRow, startCol, endRow, endCol, path);
    return path;
  }

  dfs(row, col, endRow, endCol, path) {
    if (
      row < 0 ||
      col < 0 ||
      row >= this.maze.length ||
      col >= this.maze[row].length
    ) {
      return false; // out of bounds
    }

    if (
      (!(row == endRow && col == endCol) && this.maze[row][col] === 1) ||
      this.visited[row][col]
    ) {
      return false; // wall or already visited
    }

    path.push([row, col]);
    this.visited[row][col] = true;

    if (row === endRow && col === endCol) {
      return true; // reached the end
    }

    if (this.dfs(row - 1, col, endRow, endCol, path)) {
      return true; // go up
    }

    if (this.dfs(row, col + 1, endRow, endCol, path)) {
      return true; // go right
    }

    if (this.dfs(row + 1, col, endRow, endCol, path)) {
      return true; // go down
    }

    if (this.dfs(row, col - 1, endRow, endCol, path)) {
      return true; // go left
    }

    path.pop();
    return false; // no path found
  }
}

// Example usage:
let maze = [
  [1, 1, 1, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1],
];

// here implementation of path finder

let mapping = {};

let ids = 0;
for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 7; j++) {
    mapping[ids] = [i, j];
    ids++;
  }
}

document.querySelectorAll(".item").forEach((item, index) => {
  item.setAttribute("id", `${index}`);
});

function isArrayInGroup(targetArray, group) {
  return group.some((array) => arraysMatch(array, targetArray));
}

function arraysMatch(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

let avaiable_spaces = [];
document.querySelectorAll(".item").forEach((item, index) => {
  if (item.classList.contains("parking_space")) {
    avaiable_spaces.push(mapping[item.id]);
  }
});

// parking changes management:




setInterval(() => {
  document.querySelectorAll(".item").forEach((item, index) => {
      document.getElementById(item.id).classList.remove("path_color");    
  });

  avaiable_spaces.sort(function (a, b) {
    return (
      Math.sqrt((a[0] - 0) * (a[0] - 0) + (a[1] - 3) * (a[1] - 3)) <
      Math.sqrt((b[0] - 0) * (b[0] - 0) + (b[1] - 3) * (b[1] - 3))
    );
  });
  let dest = avaiable_spaces.pop();
  console.log(dest);
  let dest_x = dest[0],
    dest_y = dest[1];

  const solver = new MazeSolver(maze);
  const path = solver.solve(0, 3, dest_x, dest_y);
  console.log(path);
  document.querySelectorAll(".item").forEach((item, index) => {
    if (isArrayInGroup(mapping[item.id], path)) {
      document.getElementById(item.id).classList.add("path_color");
    }
  });

}, 2000);




