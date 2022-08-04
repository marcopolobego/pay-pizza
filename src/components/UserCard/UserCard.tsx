import * as React from "react";
import "./UserCard.scss";
import { Player } from "../../App";

interface UserCardProps {
  userInfo: Player;
}

interface UserCardState {
  newDelays: number;
}

class UserCard extends React.Component<UserCardProps, UserCardState> {
  state = {
    newDelays: 0,
  };

  updateDelays = (delay: 1 | -1) => {
    const newDelays = this.state.newDelays + delay;
    this.setState({ newDelays });
  };

  render() {
    const { user_name, delays, toPay, percentage } = this.props.userInfo;
    const { newDelays } = this.state;

    const delaysClass =
      "new-delays " +
      (newDelays >= 0 ? "green " : "red ") +
      (newDelays != 0 && "active");

    const delayMsg =
      "About to " +
      (newDelays >= 0 ? "add " : "remove ") +
      Math.abs(newDelays) +
      " delays";
    return (
      <div className="user-card-wrapper">
        <div className="img">
          <img src="https://picsum.photos/100/100" alt="" />
        </div>

        <div className="user-info">
          <div className="name">{user_name}</div>
          <div className="to-pay">
            ${toPay?.toFixed(2)} to pay{" "}
            <span>({Math.round(percentage || 0)}%)</span>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: percentage + "%" }}></div>
          </div>
          <div className={delaysClass}>{delayMsg}</div>
        </div>

        <div className="btns">
          <div className="btn" onClick={() => this.updateDelays(+1)}>
            +
          </div>
          <div className="count">{delays.length}</div>
          <div className="btn" onClick={() => this.updateDelays(-1)}>
            -
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
