class mars {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  heading1(commands) {
    for (var i = 0; i < commands.length; i++) {
      if (commands.charAt(i) == "F") {
        this.position_forward();
      } else if (commands.charAt(i) == "B") {
        this.position_backword();
      } else if (commands.charAt(i) == "L") {
        this.rotate_left();
      } else if (commands.charAt(i) == "R") {
        this.rotate_right();
      } else {
        console.log("Not Found");
      }
    }

    this.print();
  }

  heading2(commands, obstacles) {
    var check = 0;
    for (var i = 0; i < commands.length; i++) {
      if (commands.charAt(i) == "F") {
        check = this.check_obstacle(obstacles, "F");

        if (check == -1) {
          this.print_stop();
          break;
        } else {
          this.position_forward();
        }
      } else if (commands.charAt(i) == "B") {
        check = this.check_obstacle(obs, "B");
        if (check == -1) {
          this.print_stop();
          break;
        } else {
          this.position_backword();
        }
      } else if (commands.charAt(i) == "L") {
        this.rotate_left();
      } else if (commands.charAt(i) == "R") {
        this.rotate_right();
      } else {
        console.log("Not Found");
      }
    }

    if (check != -1) this.print();
  }
  check_obstacle(obs, dir) {
    for (var i = 0; i < obs.length; i++) {
      if (dir == "F") {
        if (
          this.direction == "NORTH" &&
          this.x == obs[i][0] &&
          this.y + 1 == obs[i][1]
        ) {
          return -1;
        } else if (
          this.direction == "SOUTH" &&
          this.x == obs[i][0] &&
          this.y - 1 == obs[i][1]
        ) {
          return -1;
        } else if (
          this.direction == "EAST" &&
          this.x + 1 == obs[i][0] &&
          this.y == obs[i][1]
        ) {
          return -1;
        } else if (
          this.direction == "WEST" &&
          this.x - 1 == obs[i][0] &&
          this.y == obs[i][1]
        ) {
          return -1;
        }
      } else if (dir == "B") {
        if (
          this.direction == "NORTH" &&
          this.x == obs[i][0] &&
          this.y - 1 == obs[i][1]
        ) {
          return -1;
        } else if (
          this.direction == "SOUTH" &&
          this.x == obs[i][0] &&
          this.y + 1 == obs[i][1]
        ) {
          return -1;
        } else if (
          this.direction == "EAST" &&
          this.x - 1 == obs[i][0] &&
          this.y == obs[i][1]
        ) {
          return -1;
        } else if (
          this.direction == "WEST" &&
          this.x + 1 == obs[i][0] &&
          this.y == obs[i][1]
        ) {
          return -1;
        }
      } else {
        console.log("please enter correct direction");
      }
    }
    return 1;
  }

  position_forward() {
    if (this.direction == "NORTH") {
      this.y++;
    } else if (this.direction == "SOUTH") {
      this.y--;
    } else if (this.direction == "EAST") {
      this.x++;
    } else if (this.direction == "WEST") {
      this.x--;
    } else {
      console.log("Invalid direction");
    }
  }

  position_backword() {
    if (this.direction == "NORTH") {
      this.y--;
    } else if (this.direction == "SOUTH") {
      this.y++;
    } else if (this.direction == "EAST") {
      this.x--;
    } else if (this.direction == "WEST") {
      this.x++;
    } else {
      console.log("Invalid direction");
    }
  }
  rotate_left() {
    if (this.direction == "NORTH") {
      this.direction = "WEST";
    } else if (this.direction == "WEST") {
      this.direction = "SOUTH";
    } else if (this.direction == "SOUTH") {
      this.direction = "EAST";
    } else if (this.direction == "EAST") {
      this.direction = "NORTH";
    } else {
      console.log("Not Found");
    }
  }
  rotate_right() {
    if (this.direction == "NORTH") {
      this.direction = "EAST";
    } else if (this.direction == "EAST") {
      this.direction = "SOUTH";
    } else if (this.direction == "SOUTH") {
      this.direction = "WEST";
    } else if (this.direction == "WEST") {
      this.direction = "NORTH";
    } else {
      console.log("Not Foumd");
    }
  }

  generate_command(heading_x, heading_y, obs) {
    var commands = "";
    var ch = 0;
    while (true) {
      if (this.x == heading_x && this.y == heading_y) {
        return commands;
      } else {
        if (this.direction == "NORTH") {
          if (ch == -1) {
            ch = this.check_obstacle(obs, "F");
            if (ch != -1) {
              commands += "F";
              this.position_forward();
              commands += "R";
              this.rotate_right();
            } else {
              commands += "B";
              this.position_backword();
              commands += "R";
              this.rotate_right();
            }
          }
          if (heading_y > this.y) {
            ch = this.check_obstacle(obs, "F");
            if (ch != -1) {
              commands += "F";
              this.position_forward();
            } else {
              if (heading_x >= this.x) {
                commands += "R";
                this.rotate_right();
              } else if (this.x > heading_x) {
                commands += "L";
                this.rotate_left();
              }
            }
          } else if (this.y > heading_y) {
            ch = this.check_obstacle(obs, "B");
            if (ch != -1) {
              commands += "B";
              this.position_backword();
            } else {
              if (heading_x >= this.x) {
                commands += "R";
                this.rotate_right();
              } else if (this.x > heading_x) {
                commands += "L";
                this.rotate_left();
              }
            }
          } else if (heading_x > this.x) {
            commands += "R";
            this.rotate_right();
          } else {
            commands += "L";
            this.rotate_left();
          }
        } else if (this.direction == "SOUTH") {
          if (ch == -1) {
            ch = this.check_obstacle(obs, "F");
            if (ch != -1) {
              commands += "F";
              this.position_forward();
              commands += "R";
              this.rotate_right();
            } else {
              commands += "B";
              this.position_backword();
              commands += "R";
              this.rotate_right();
            }
          }
          if (this.y > heading_y) {
            ch = this.check_obstacle(obs, "F");
            if (ch != -1) {
              commands += "F";
              this.position_forward();
            } else {
              if (heading_x >= this.x) {
                commands += "R";
                this.rotate_right();
              } else if (this.x > heading_x) {
                commands += "L";
                this.rotate_left();
              }
            }
          } else if (heading_y > this.y) {
            ch = this.check_obstacle(obs, "B");
            if (ch != -1) {
              commands += "B";
              this.position_backword();
            } else {
              if (heading_x >= this.x) {
                commands += "R";
                this.rotate_right();
              } else if (this.x > heading_x) {
                commands += "L";
                this.rotate_left();
              }
            }
          } else if (heading_x > this.x) {
            commands += "L";
            this.rotate_left();
          } else {
            commands += "R";
            this.rotate_right();
          }
        } else if (this.direction == "EAST") {
          if (ch == -1) {
            ch = this.check_obstacle(obs, "F");
            if (ch != -1) {
              commands += "F";
              this.position_forward();
              commands += "R";
              this.rotate_right();
            } else {
              commands += "B";
              this.position_backword();
              commands += "R";
              this.rotate_right();
            }
          }
          if (heading_x > this.x) {
            ch = this.check_obstacle(obs, "F");
            if (ch != -1) {
              commands += "F";
              this.position_forward();
            } else {
              if (heading_y < this.y) {
                commands += "R";
                this.rotate_right();
              } else if (heading_y >= this.y) {
                commands += "L";
                this.rotate_left();
              }
            }
          } else if (this.x > heading_x) {
            ch = this.check_obstacle(obs, "B");
            if (ch != -1) {
              commands += "B";
              this.position_backword();
            } else {
              if (heading_y < this.y) {
                commands += "R";
                this.rotate_right();
              } else if (heading_y >= this.y) {
                commands += "L";
                this.rotate_left();
              }
            }
          } else if (heading_y > this.y) {
            commands += "L";
            this.rotate_left();
          } else {
            commands += "R";
            this.rotate_right();
          }
        } else if (this.direction == "WEST") {
          if (ch == -1) {
            ch = this.check_obstacle(obs, "F");
            if (ch != -1) {
              commands += "F";
              this.position_forward();
              commands += "R";
              this.rotate_right();
            } else {
              commands += "B";
              this.position_backword();
              commands += "R";
              this.rotate_right();
            }
          } else if (heading_x < this.x) {
            ch = this.check_obstacle(obs, "F");
            if (ch != -1) {
              commands += "F";
              this.position_forward();
            } else {
              if (heading_y >= this.y) {
                commands += "R";
                this.rotate_right();
              } else if (heading_y < this.y) {
                commands += "L";
                this.rotate_left();
              }
            }
          } else if (heading_x > this.x) {
            ch = this.check_obstacle(obs, "B");
            if (ch != -1) {
              commands += "B";
              this.position_backword();
            } else {
              if (heading_y >= this.y) {
                commands += "R";
                this.rotate_right();
              } else if (heading_y < this.y) {
                commands += "L";
                this.rotate_left();
              }
            }
          } else if (heading_y > this.y) {
            commands += "R";
            this.rotate_right();
          } else {
            commands += "L";
            this.rotate_left();
          }
        } else {
          console.log("invalid direction");
        }
      }
    }
  }

  print() {
    console.log("(" + this.x + "," + this.y + ") " + this.direction);
  }
  print_stop() {
    console.log(
      "(" + this.x + "," + this.y + ") " + this.direction + " stopped"
    );
  }
}

let P = new mars(1, 2, "NORTH");

// PART I
console.log("Part I");
P.heading1("FRFFFLFBBLFF");

// PART II
console.log("Part II");
var obstacles1 = [
  [1, 4],
  [-1, 0],
  [0, -1],
  [4, 3],
  [7, 4],
  [0, -3],
];
P.heading2("FRFFFLFBBLFF", obstacles1);

// PART III
console.log("Part III");
var obstacles2 = [
  [1, 4],
  [-1, 0],
  [0, -1],
  [2, 3],
  [7, 4],
  [0, -3],
];
//     arguments is (heading x, heading y, obstacles)
command = P.generate_command(5, 3, obstacles2);
console.log(command);
