import "./App.scss";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import UserCard from "./components/UserCard/UserCard";
import * as React from "react";
import axios from "axios";

export interface Player {
  _id: string;
  user_name: string;
  delays: Date[];
  toPay?: number;
  percentage?: number;
}

interface AppProps {}

interface AppState {
  players: Player[];
  pizzasPrice?: number;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    players: [],
    pizzasPrice: 300,
  };

  calculateAmount = (pizzasPrice: number, players: Player[]) => {
    if (!players) return;

    const totalDelays = players
      .map((p: Player) => p.delays.length)
      .reduce((p1: any, p2: any) => {
        return p1 + p2;
      }, 0);

    const unitPrice = pizzasPrice / totalDelays;

    const toPay = players
      .map((player: Player): Player => {
        const { delays } = player;
        player.toPay = player.delays.length * unitPrice || 0;
        player.percentage = (player.delays.length / totalDelays) * 100;
        return player;
      })
      .sort(
        (playerA: any, playerB: any) =>
          playerB.delays.length - playerA.delays.length
      );

    this.setState({ players: toPay, pizzasPrice });
  };

  componentDidMount() {
    axios.get("/user").then(({ data }) => {
      this.calculateAmount(this.state.pizzasPrice, data);
    });
  }

  render() {
    const { players, pizzasPrice } = this.state;
    return (
      <div className="wrapper">
        <h1>BeGo pizzas</h1>
        <div>
          <h2>Participants:</h2>
          <div className="users">
            {players.map((player: Player) => (
              <UserCard key={player._id} userInfo={player}></UserCard>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

