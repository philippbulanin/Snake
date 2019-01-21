import React from "react"

export class Difficulty extends React.Component {

    handleChange = (event) => {
        this.props.changeLevel(event.target.value)
    };

    render() {
        const comment = {
            easy: "Yawn. B-o-o-o-ring...",
            medium: "Where is your left hand, sneaky boy?",
            hard: "Strain yor hands",
            crazy: "Are you sure?",
            insane: "Run, Forest! Run!"
        };
        return (
            <div
                className="difficulty">
                <div className="difficulty-levels-list">
                    <label
                        className={"difficulty-level" + (this.props.level === "easy" ? " checked" : "")}>
                        Easy
                        <input
                            className="difficulty-radio"
                            name="level"
                            type="radio"
                            value="easy"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label
                        className={"difficulty-level" + (this.props.level === "medium" ? " checked" : "")}>
                        Medium
                        <input
                            className="difficulty-radio"
                            name="level"
                            type="radio"
                            value="medium"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label
                        className={"difficulty-level" + (this.props.level === "hard" ? " checked" : "")}>
                        Hard
                        <input
                            className="difficulty-radio"
                            name="level"
                            type="radio"
                            value="hard"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label
                        className={"difficulty-level" + (this.props.level === "crazy" ? " checked" : "")}>
                        Crazy
                        <input
                            className="difficulty-radio"
                            name="level"
                            type="radio"
                            value="crazy"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label
                        className={"difficulty-level" + (this.props.level === "insane" ? " checked" : "")}>
                        Insane
                        <input
                            className="difficulty-radio"
                            name="level"
                            type="radio"
                            value="insane"
                            onChange={this.handleChange}
                        />
                    </label>
                </div>
                <div className="difficulty-comment">{comment[this.props.level]}</div>
            </div>
        )
    }
}