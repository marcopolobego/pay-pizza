import * as React from "react";
import "./UserCard.scss";

interface UserInfo {
  user_name: string;
  delays: Date[];
}

interface UserCardProps {
  userInfo: UserInfo;
}

interface UserCardState {}

class UserCard extends React.Component<UserCardProps, UserCardState> {
  state = {};
  render() {
    return (
      <div className="user-card-wrapper">
        <div className="progress-bar-wrapper">
          <div className="progress" style={{ width: "35%" }}></div>
        </div>
        This is user card
      </div>
    );
  }
}

export default UserCard;
