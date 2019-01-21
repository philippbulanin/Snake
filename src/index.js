import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Field} from "./components/Field";
import {SubMenu} from "./components/SubMenu";

class Snake extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field: [],
            xSize: 10, ySize: 10,
            headX: 9, headY: 5,
            snake: {x: [9], y: [5], length: 1},
            direction: "",
            appleX: 2, appleY: 1,
            isStarted: false,
            isWallsTransparent: false,
            difficulty: {easy: 500, medium: 350, hard: 200, crazy: 100, insane: 50},
            level: "easy",
            score: 0,
            coefficient: {easy: 1, medium: 2, hard: 3, crazy: 5, insane: 10},
            screen: "mainMenu",
        };
    }


    componentDidMount() {
        document.addEventListener("keydown", this.changeDirection);
        document.addEventListener("keydown", this.handleSpace);
    }

    calcScore() {
        this.setState({
            score: (this.state.snake.length - 1) * 100 * this.state.coefficient[this.state.level]
        });
    }

    generateApple() {
        const newAppleX = Math.round(Math.random() * (this.state.xSize - 1));
        const newAppleY = Math.round(Math.random() * (this.state.ySize - 1));
        if (!this.isSnake(newAppleX, newAppleY) && newAppleX !== this.state.headX && newAppleY !== this.state.headY) {
            this.setState({
                appleX: newAppleX,
                appleY: newAppleY
            });
        } else {
            this.generateApple();
        }
    }

    changeLevel = (level) => {
        this.setState({
            level: level
        });
    };

    changeDirection = (event) => {
        if (event.keyCode === 37 && this.state.direction !== "right") {
            this.setState({
                direction: "left"
            });
        }
        if (event.keyCode === 38 && this.state.direction !== "down") {
            this.setState({
                direction: "up"
            });
        }
        if (event.keyCode === 39 && this.state.direction !== "left") {
            this.setState({
                direction: "right"
            });
        }
        if (event.keyCode === 40 && this.state.direction !== "up") {
            this.setState({
                direction: "down"
            });
        }
    };

    move() {
        switch (this.state.direction) {
            case "left":
                this.setState({
                    headX: this.state.headX - 1
                });
                break;
            case "right":
                this.setState({
                    headX: this.state.headX + 1
                });
                break;
            case "up":
                this.setState({
                    headY: this.state.headY - 1
                });
                break;
            case "down":
                this.setState({
                    headY: this.state.headY + 1
                });
                break;
            default:
                this.setState({
                    headX: this.state.headX,
                    headY: this.state.headY,
                });
        }

        this.cannibal();

        if (this.state.headX === this.state.appleX && this.state.headY === this.state.appleY) {
            this.setState({
                snake: {x: this.state.snake.x, y: this.state.snake.y, length: this.state.snake.length + 1},
            });
            this.calcScore();
            this.generateApple();
        }

        if (this.state.isWallsTransparent) {
            if (this.state.headX < 0) this.setState({headX: this.state.xSize - 1});
            if (this.state.headX > this.state.xSize - 1) this.setState({headX: 0});
            if (this.state.headY < 0) this.setState({headY: this.state.ySize - 1});
            if (this.state.headY > this.state.ySize - 1) this.setState({headY: 0});
        } else {
            if (this.state.headX < 0 || this.state.headX > this.state.xSize - 1 ||
                this.state.headY < 0 || this.state.headY > this.state.ySize - 1) {
                this.stop();
                this.setState({screen: "gameOver"});
            }
        }
    }

    cannibal() {
        for (let i = 1; i < this.state.snake.length; i++) {
            if (this.state.snake.x[i] === this.state.headX && this.state.snake.y[i] === this.state.headY) {
                this.stop();
                this.setState({screen: "gameOver"});
            }
        }
    }

    isSnake(x, y) {
        for (let i = 0; i < this.state.snake.length; i++) {
            if (this.state.snake.x[i] === x && this.state.snake.y[i] === y) return true;
        }
        return false;
    }

    makeSnake() {
        let x = this.state.snake.x,
            y = this.state.snake.y;

        for (let i = this.state.snake.length - 1; i >= 0; i--) {
            if (i > 0) {
                x[i] = x[i - 1];
                y[i] = y[i - 1];
            }
            if (i === 0) {
                x[i] = this.state.headX;
                y[i] = this.state.headY;
            }
        }
        this.setState({
            snake: {x: x, y: y, length: this.state.snake.length}
        });
    }

    drawField() {
        let data = [];
        let className = "";
        for (let y = 0; y < this.state.ySize; y++) {
            data[y] = [];
            for (let x = 0; x < this.state.xSize; x++) {
                if (this.isSnake(x, y)) {
                    if (x === this.state.headX && y === this.state.headY) {
                        className = "head"
                    } else {
                        className = "snake"
                    }
                } else if (x === this.state.appleX && y === this.state.appleY) {
                    className = "apple"
                } else {
                    className = "pixel"
                }
                data[y].push({key: x + "" + y, className: className, value: x + ":" + y});
            }
        }
        this.setState({
            field: this.state.field.concat(data)
        });
    }

    handleSpace = (event) => {
        if(event.keyCode === 32 && this.state.screen === "mainMenu") this.start();
        if(event.keyCode === 32 && this.state.screen === "gameOver") this.restart();
    };

    start() {
        this.setDefault();
        if (!this.state.isStarted) {
            this.timerID = setInterval(() => {
                this.setState({
                    screen: "game",
                    field: [],
                    isStarted: true,
                });
                console.log("drawing...");
                this.move();
                this.makeSnake();
                this.drawField();
            }, this.state.difficulty[this.state.level])
        }
    }

    stop() {
        if (this.state.isStarted) {
            clearInterval(this.timerID);
            this.setState({
                isStarted: false
            });
        }
    }

    setDefault() {
        this.stop();
        this.setState({
            headX: 9, headY: 5,
            snake: {x: [9], y: [5], length: 1},
            direction: "",
            appleX: 2, appleY: 1,
            score: 0,
            isStarted: false,
        });
    }

    restart() {
        this.setDefault();
        this.start();
    }

    goToMainMenu() {
        this.setDefault();
        this.setState({
            screen: "mainMenu"
        });
    }

    render() {
        const subMenu = this.state.screen === "game" || this.state.screen === "gameOver" ?
              <SubMenu
                  level={this.state.level}
                  goToMainMenu={this.goToMainMenu.bind(this)}
                  score={this.state.score}
              /> : null;
        return (
            <div
                className="wrapper"
                onKeyDown={this.changeDirection.bind(this)}>
                {subMenu}
                <Field
                    field={this.state.field}
                    score={this.state.score}
                    restart={this.restart.bind(this)}
                    start={this.start.bind(this)}
                    screen={this.state.screen}
                    changeLevel={this.changeLevel}
                    level={this.state.level}
                />
            </div>

        )
    }
}

ReactDOM.render(<Snake/>, document.getElementById("root"));
