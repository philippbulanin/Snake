import React from 'react';

export class GameOver extends React.Component {
    render() {
        let lastWords = "";
        if (this.props.score === 0) lastWords = "Hmmm. Try to move on the... over side";
        if (this.props.score > 0 && this.props.score <= 1000) lastWords = "Have you done your homework?";
        if (this.props.score > 1000 && this.props.score <= 3000) lastWords = "I believe you can better!";
        if (this.props.score > 3000 && this.props.score <= 4000) lastWords = "Not bad, bro! Not bad!";
        if (this.props.score > 4000 && this.props.score <= 5000) lastWords = "Are you human?";
        if (this.props.score > 5000) lastWords = "I`ll call you master!";

        return (
            <div className={"gameover"} style={{zIndex: this.props.zIndex}}>
                <div className="gameover-info">
                    <h2 className="gameover-lastwords">{lastWords}</h2>
                    <h3 className="gameover-score">Your score: {this.props.score}</h3>
                </div>
                <h1 className="gameover-title">Game Over</h1>
                <div className="gameover-button-wrapper">
                    <button className="gameover-restart" onClick={this.props.restart}>Restart</button>
                    <div className="explanation">Press Space or push Restart</div>
                </div>
            </div>
        )
    }
}