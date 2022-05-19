import "./App.scss";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import * as React from "react";
interface Player {
  name: string;
  delays: number;
  toPay?: number;
}

interface AppProps {}

interface AppState {
  players: Player[];
  pizzasPrice?: number;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    players: [
      {
        name: "Marcos",
        delays: 1,
        toPay: 0,
      },
      {
        name: "Marco",
        delays: 3,
        toPay: 0,
      },
      {
        name: "Julio",
        delays: 7,
        toPay: 0,
      },
      {
        name: "Alberto",
        delays: 2,
        toPay: 0,
      },
      {
        name: "Omar",
        delays: 7,
        toPay: 0,
      },
      {
        name: "Federico",
        delays: 2,
        toPay: 0,
      },
      {
        name: "Charly",
        delays: 0,
        toPay: 0,
      },
      {
        name: "Ignacio",
        delays: 3,
        toPay: 0,
      },
    ],
    pizzasPrice: 0,
  };

  calculateAmount = ({ target }: React.SyntheticEvent) => {
    const { players } = this.state;
    const pizzasPrice = parseFloat((target as HTMLInputElement).value);
    this.setState({ pizzasPrice });

    const totalDelays = players
      .map((p) => p.delays)
      .reduce((p1: any, p2: any) => {
        console.log("P1 is: ", p1, p2);
        return p1 + p2;
      });

    const unitPrice = pizzasPrice / totalDelays;

    const toPay = players.map((player): Player => {
      player.toPay = player.delays * unitPrice;
      return player;
    });

    this.setState({ players: toPay });
  };

  render() {
    const { players, pizzasPrice } = this.state;
    return (
      <div className="wrapper">
        <h1>BeGo pizzas</h1>
        <div>
          <div>Pizzas price:</div>
          <input
            value={this.state.pizzasPrice}
            onChange={this.calculateAmount}
            type="number"
          />
        </div>
        <div>
          <h2>Participants:</h2>

          {players.map((player) => (
            <div key={player.name} className="player-info">
              <div>{player.name}</div>
              <ProgressBar
                percentage={(player.toPay / pizzasPrice) * 100}
                label={`$${player.toPay.toFixed(1) || 0}`}
              ></ProgressBar>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
