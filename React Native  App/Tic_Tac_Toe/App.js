import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
      pointerEvents: 'auto',
      playerN: 0,
      playerX: 0,
      draw: 0,
      count: 0,
      player: '',
      playerTurn: 'N`s turn !',
    };
  }

  componentDidMount() {
    this.initialGame();
  }

  initialGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    });
  };

  getWinner = () => {
    const tilesNum = 3;
    var sum;
    var arr = this.state.gameState.slice();
    for (var i = 0; i < tilesNum; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }

    for (var i = 0; i < tilesNum; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }

    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }

    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }

    return 0;
  };

  onTilePress = (row, col) => {
    var value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    this.setState({count: this.state.count + 1});
    if (this.state.playerTurn === 'N`s turn !') {
      this.setState({playerTurn: 'X`s turn !'});
    } else {
      this.setState({playerTurn: 'N`s turn !'});
    }

    var currentPlayer = this.state.currentPlayer;
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    var nextPlayer = currentPlayer === 1 ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    var winner = this.getWinner();
    if (winner === 1) {
      this.setState({
        pointerEvents: 'none',
        playerN: this.state.playerN + 1,
        player: 'Player N is the winner !',
      });
    } else if (winner === -1) {
      this.setState({
        pointerEvents: 'none',
        playerX: this.state.playerX + 1,
        player: 'Player X is the winner !',
      });
    } else if (this.state.count === 8) {
      this.setState({
        draw: this.state.draw + 1,
        player: 'Match Draw!',
        pointerEvents: 'none',
      });
    }
  };

  playAgain = () => {
    this.initialGame();
    this.setState({
      pointerEvents: 'auto',
      count: 0,
      player: '',
      playerTurn: 'N`s turn !',
    });
  };
  resetAll = () => {
    this.initialGame();
    this.setState({
      playerN: 0,
      playerX: 0,
      draw: 0,
      pointerEvents: 'auto',
      count: 0,
      player: '',
      playerTurn: 'N`s turn !',
    });
  };

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Text style={styles.iconN}>N</Text>;
      case -1:
        return <Text style={styles.iconX}>X</Text>;
      default:
        return <View />;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar animated={true} backgroundColor="#FF0062" />
        <View style={styles.headerStyle}>
          <Text style={styles.headerText}>Tic Tac Toe</Text>
        </View>
        <View style={styles.resultView}>
          <Text style={styles.resultText}>Player N : {this.state.playerN}</Text>
          <Text style={styles.resultText}>Player X : {this.state.playerX}</Text>
          <Text style={styles.resultText}>Match Draw : {this.state.draw}</Text>
        </View>
        <View style={styles.mainScreen}>
          <View style={styles.boxTile} pointerEvents={this.state.pointerEvents}>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 0)}
              style={styles.tileStyle}>
              {this.renderIcon(0, 0)}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.onTilePress(0, 1)}
              style={styles.tileStyle}>
              {this.renderIcon(0, 1)}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.onTilePress(0, 2)}
              style={styles.tileStyle}>
              {this.renderIcon(0, 2)}
            </TouchableOpacity>
          </View>

          <View style={styles.boxTile} pointerEvents={this.state.pointerEvents}>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 0)}
              style={styles.tileStyle}>
              {this.renderIcon(1, 0)}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.onTilePress(1, 1)}
              style={styles.tileStyle}>
              {this.renderIcon(1, 1)}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.onTilePress(1, 2)}
              style={styles.tileStyle}>
              {this.renderIcon(1, 2)}
            </TouchableOpacity>
          </View>

          <View style={styles.boxTile} pointerEvents={this.state.pointerEvents}>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 0)}
              style={styles.tileStyle}>
              {this.renderIcon(2, 0)}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.onTilePress(2, 1)}
              style={styles.tileStyle}>
              {this.renderIcon(2, 1)}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.onTilePress(2, 2)}
              style={styles.tileStyle}>
              {this.renderIcon(2, 2)}
            </TouchableOpacity>
          </View>

          <View style={styles.winnerStyle}>
            <Text style={styles.resultText}>{this.state.player}</Text>
            {this.state.player === '' ? (
              <Text style={styles.resultText}>{this.state.playerTurn}</Text>
            ) : null}
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => this.resetAll()}
              style={styles.buttonText}>
              <Text style={styles.text}>New Game</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.playAgain()}
              style={styles.buttonText}>
              <Text style={styles.text}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDDEA',
  },
  headerStyle: {
    height: 60,
    backgroundColor: '#FF0062',
    justifyContent: 'center',
    elevation: 10,
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  mainScreen: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
  },
  boxTile: {
    flexDirection: 'row',
  },
  tileStyle: {
    borderWidth: 5,
    height: 100,
    width: 100,
    borderRadius: 12,
  },
  iconN: {
    fontSize: 65,
    alignSelf: 'center',
    color: '#00C8CB',
  },
  iconX: {
    fontSize: 65,
    alignSelf: 'center',
    color: 'red',
  },
  buttonView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
  },
  buttonText: {
    borderWidth: 2,
    padding: 5,
    borderColor: '#FF0062',
    borderRadius: 7,
    marginHorizontal: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    color: '#FF0062',
    fontWeight: 'bold',
  },

  resultText: {
    fontSize: 23,
    padding: 10,
    fontWeight: 'bold',
    // color: '#FF0062',
  },
  winnerStyle: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default App;
