import React from 'react';
import {Difficulty} from "./Difficulty";

export class MainMenu extends React.Component {
    render() {
        return (
            <div className="main-menu">
                <h1 className="main-menu-title">
                    --Snake--
                </h1>
                <div className="main-menu-button-wrapper">
                    <button
                        className="main-menu-btn"
                        onClick={this.props.start}>
                        Start
                    </button>
                    <div className="explanation">Press Space or click Start</div>
                </div>
                <Difficulty
                    changeLevel={this.props.changeLevel}
                    level={this.props.level}
                />
                <h2 className="main-menu-by">by Philipp Bulanin</h2>
            </div>
        )
    }
}