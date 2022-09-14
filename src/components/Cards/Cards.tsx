import * as React from "react";
import { Player } from "../../App";
import UserCard, { NewUserDelays } from "../UserCard/UserCard";
import "./Cards.scss";

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
    this.state.cardsRef.forEach(
      ({ current: userCard }: React.RefObject<UserCard>) => {
        console.log("User card: ");
        userCard?.clearDelays();
      }
    );

    this.setState({ newDelays: [] });
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

  componentDidMount() {}

  componentDidUpdate({ users }: CardsProps) {
    if (users.length !== this.props.users.length) {
      console.log("state is: ", this.state.newDelays);
      const cardsRef = this.props.users.map(
        () => React.createRef() as React.RefObject<UserCard>
      );
      this.setState({ cardsRef: cardsRef, newDelays: this.state.newDelays });
    }
  }

  render() {
    const { newDelays, cardsRef } = this.state;
    const { users, updateDelays } = this.props;
    return (
      <div  className="cards">
        <div className="users">
          {users.map((player: Player, i: number) => (
            <UserCard
              ref={cardsRef[i]}
              key={player._id}
              userInfo={player}
              onDelaysChange={this.handleDelaysChanges}
            ></UserCard>
          ))}
        </div>

        <div
          className={`save-btn ${newDelays.length && "active" || ""}`}
          onClick={() => updateDelays(newDelays)}
        >
          UPDATE DELAYS
        </div>
      </div>
    );
  }
}

export default Cards;
