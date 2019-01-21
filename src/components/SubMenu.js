import React from "react"

export class SubMenu extends React.Component {
    render() {
        const textColor = {
            easy: "#00ff04",
            medium: "#ffde00",
            hard: "#ff3300",
            crazy: "#004bff",
            insane: "#bb00ff"
        };

        return (
            <div className="sub-menu">
                <div className="sub-menu-score">
                    Score: {this.props.score}
                </div>
                <div className="sub-menu-level">
                     Level: <div style={{color: textColor[this.props.level]}}>{this.props.level}</div>
                </div>
                <button
                    className="sub-menu-btn"
                    onClick={this.props.goToMainMenu}>
                    Main menu
                </button>
            </div>
        )
    }
}