import * as React from "react";
import "./ProgressBar.scss";

interface ProgressBarProps {
  percentage: number;
  label?: string;
}

interface ProgressBarState {}

class ProgressBar extends React.Component<ProgressBarProps, ProgressBarState> {
  state = {};
  render() {
    const { percentage, label } = this.props;
    return (
      <div className="progress-container">
        <div className="progress" style={{ width: `${percentage}%` }}></div>
        <div className="percentage">{label || `${percentage}%`}</div>
      </div>
    );
  }
}

export default ProgressBar;
