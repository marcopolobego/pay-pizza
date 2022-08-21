import * as React from "react";
import { Player } from "../../App";
import UserCard, { NewUserDelays } from "../UserCard/UserCard";
import "./Cards.scss";
import axios from "axios";

interface CardsProps {
  users: Player[];
  updateDelays: (delays: NewUserDelays[]) => void;
}

interface CardsState {
  cardsRef: React.RefObject<UserCard>[];
  newDelays: NewUserDelays[];
}

class Cards extends React.Component<CardsProps, CardsState> {
  state = {
    cardsRef: [],
    newDelays: [],
  };

  clearValuesToBeAdded = () => {
    console.log("calling clearValuesToBeAdded");
  };

  handleDelaysChanges = (change: NewUserDelays) => {
    const { newDelays }: { newDelays: NewUserDelays[] } = this.state;
    const user = newDelays.find(
      (e: NewUserDelays) => change.user_id == e.user_id
    );

    if (!user) {
      newDelays.push(change);
      this.setState({ newDelays });
      return;
    }

    if (change.num_delays != 0) {
      user.num_delays = change.num_delays;
    } else {
      newDelays.splice(newDelays.indexOf(user), 1);
    }

    this.setState({ newDelays });
  };

  componentDidMount() {
    const cardsRef = this.props.users.map(
      () => React.createRef() as React.RefObject<UserCard>
    );
    this.setState({ cardsRef });
    console.log("Refs are: ", this.state.cardsRef, cardsRef);
  }

  render() {
    const { newDelays } = this.state;
    const { users, updateDelays } = this.props;
    return (
      <div>
        <div className="users">
          {users.map((player: Player) => (
            <UserCard
              key={player._id}
              userInfo={player}
              onDelaysChange={this.handleDelaysChanges}
            ></UserCard>
          ))}
        </div>

        <div
          className={`save-btn ${newDelays.length && "active"}`}
          onClick={() => updateDelays(newDelays)}
        >
          UPDATE DELAYS
        </div>
      </div>
    );
  }
}

export default Cards;
