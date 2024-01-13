import "./App.css";
import xImage from "./image/xImage.png";
import oImage from "./image/oImage.png";
import { useState, useEffect } from "react";

function App() {
  const [heading, setHeading] = useState("Tic Tac Toe");
  const [stopGame, setStopGame] = useState(false);
  const [array, setArray] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [curValue, setCurValue] = useState("o");

  useEffect(() => {
    if (!checkIsAnyoneWon()) {
      checkDraw();
    }
    setCurValue((value) => {
      return value === "o" ? "x" : "o";
    });
  }, [array]);

  const checkRow = (x) => {
    if (
      array[x][0] === array[x][1] &&
      array[x][1] === array[x][2] &&
      array[x][0] !== ""
    ) {
      return true;
    }
    return false;
  };

  const checkColumn = (y) => {
    if (
      array[0][y] === array[1][y] &&
      array[1][y] === array[2][y] &&
      array[0][y] !== ""
    ) {
      return true;
    }
    return false;
  };

  const checkIsAnyoneWon = () => {
    for (let i = 0; i < 3; i++) {
      const x = checkColumn(i);
      const y = checkRow(i);

      if (x || y) {
        const result = `player ${curValue === "o" ? "1" : "2"} won`;
        setHeading(result);
        setStopGame(true);
        restartGame();
        return true;
      }
    }

    // for diagonal

    if (
      array[0][0] === array[1][1] &&
      array[1][1] === array[2][2] &&
      array[1][1] !== ""
    ) {
      const result = `player ${curValue === "o" ? "1" : "2"} won`;
      setHeading(result);
      setStopGame(true);
      restartGame();
      return true;
    }

    if (
      array[0][2] === array[1][1] &&
      array[1][1] === array[2][0] &&
      array[1][1] !== ""
    ) {
      const result = `player ${curValue === "o" ? "1" : "2"} won`;
      setHeading(result);
      setStopGame(true);
      restartGame();
      return true;
    }
    return false;
  };

  const checkDraw = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (array[i][j] === "") return;
      }
    }
    setHeading("Game Draw");
    setStopGame(true);
    restartGame();
  };

  const restartGame = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleClick = (x, y) => {
    if (stopGame || array[x][y] !== "") return;
    const newArray = [...array];
    newArray[x][y] = curValue;
    setArray(newArray);
  };

  const randerImage = (x, y) => {
    return (
      <div
        style={{
          height: "130px",
          width: "130px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid black",
        }}
        onClick={() => handleClick(x, y)}
      >
        {array[x][y] === "x" && <img src={xImage} alt="" height={120}></img>}
        {array[x][y] === "o" && <img src={oImage} alt="" height={120}></img>}
      </div>
    );
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <h1 style={{ textAlign: "center" }}>{heading}</h1>

      <p style={{ marginLeft: "20px" }}>
        Player 1 = O{" "}
        <span style={{ color: "green" }}>
          {curValue === "o" ? " ( Current Turn )" : ""}
        </span>
      </p>
      <p style={{ marginLeft: "20px" }}>
        Player 2 = X{" "}
        <span style={{ color: "green" }}>
          {curValue === "x" ? " ( Current Turn )" : ""}
        </span>
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex" }}>
          {randerImage(0, 0)}
          {randerImage(0, 1)}
          {randerImage(0, 2)}
        </div>
        <div style={{ display: "flex" }}>
          {randerImage(1, 0)}
          {randerImage(1, 1)}
          {randerImage(1, 2)}
        </div>
        <div style={{ display: "flex" }}>
          {randerImage(2, 0)}
          {randerImage(2, 1)}
          {randerImage(2, 2)}
        </div>
      </div>
    </div>
  );
}

export default App;
