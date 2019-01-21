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
        const levels = ["easy", "medium", "hard", "crazy", "insane"];
        return (
            <div
                className="difficulty">
                <div className="difficulty-levels-list">
                    {levels.map((level) =>
                        <label
                            className={"difficulty-level" + (this.props.level === {level} ? " checked" : "")}>
                            {level}
                            <input
                                className="difficulty-radio"
                                name="level"
                                type="radio"
                                value="easy"
                                onChange={this.handleChange}
                            />
                        </label>
                    )}
                </div>
                <div className="difficulty-comment">{comment[this.props.level]}</div>
            </div>
        )
    }
}