import React from 'react';
import {Pixel} from "./Pixel";
import {GameOver} from "./GameOver";
import {MainMenu} from "./MainMenu";

export class Field extends React.Component {
    render() {
        let field = [];
        const zIndex = this.props.screen === "gameOver" ? 1 : -1;
        if (this.props.screen === "mainMenu") {
            field =
                <MainMenu
                    start={this.props.start}
                    changeLevel={this.props.changeLevel}
                    level={this.props.level}
                />
        }
        if (this.props.screen === "game" || this.props.screen === "gameOver") {
            field = [
                <GameOver
                    key={"gameOver"}
                    zIndex={zIndex}
                    score={this.props.score}
                    restart={this.props.restart}
                />,
                this.props.field.map((pixelX) =>
                    pixelX.map((pixelY) =>
                        <Pixel
                            key={pixelY.key}
                            className={pixelY.className}
                            value={pixelY.value}
                        />)
                )]
        }
        return (
            <div className="field">
                {field}
            </div>
        )
    }
}

