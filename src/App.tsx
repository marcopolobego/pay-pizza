import "./App.scss";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Cards from "./components/Cards/Cards";
import UserCard, { NewUserDelays } from "./components/UserCard/UserCard";
import * as React from "react";
import axios from "axios";

export interface Player {
  _id: string;
  user_name: string;
  delays: Date[];
  toPay?: number;
  percentage?: number;
  avatar?: string;
}

interface AppProps {}

interface AppState {
  players: Player[];
  pizzasPrice: number;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    players: [],
    pizzasPrice: 0,
  };

  private cardsRef: React.RefObject<Cards> = React.createRef<Cards>();

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

  updatePizzasPrice = ({ target }: React.BaseSyntheticEvent) => {
    this.calculateAmount(target.value, this.state.players);
  };

  pushNewPrice = () => {
    axios
      .post("/price-history/update-price", {
        price: this.state.pizzasPrice,
      })
      .then((result: any) => {
        console.log("Pizzas price was just pushed");
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  };

  componentDidMount() {
    axios
      .get("/price-history/last-price")
      .then(({ data }: any) => {
        this.setState({ pizzasPrice: data.price });
      })
      .then(() => axios.get("/user"))
      .then(({ data }: any) => {
        this.calculateAmount(this.state.pizzasPrice, data);
      });
  }

  updateDelays = (delays: NewUserDelays[]) => {
    axios.put("/user/update-delays", delays).then(({ data }) => {
      this.calculateAmount(this.state.pizzasPrice, data);
      this.cardsRef.current?.clearValuesToBeAdded();
    });
  };

  render() {
    const { players, pizzasPrice } = this.state;
    return (
      <div className="wrapper">
        <h1>BeGo pizzas</h1>
        <input
          type="number"
          value={pizzasPrice}
          onChange={this.updatePizzasPrice}
        />
        <button style={{ marginLeft: "10px" }} onClick={this.pushNewPrice}>
          Update Price
        </button>
        <div>
          <h2>Participants</h2>
          <Cards
            users={players}
            ref={this.cardsRef}
            updateDelays={this.updateDelays}
          />
        </div>
      </div>
    );
  }
}

export default App;

