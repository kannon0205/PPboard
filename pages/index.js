import { useState, useEffect } from "react";
import Image from "next/image";

//css
import styles from "../styles/Home.module.scss";

//components
import Layout from "./components/Layout";
import Server from "./components/Server";
import Point from "./components/Point";
import Modal from "./components/Modal";

export default function Home() {
  //ゲームフラグ [0 = 準備中] [1 = ゲーム中] [2 = 終了]
  const [gameFlag, setGameFlag] = useState(0);

  //得点関連
  const [point1, setPoint1] = useState(0);
  const [point2, setPoint2] = useState(0);

  //デュース判定
  const [deuce, setDeuce] = useState(false);

  //サーブ関連
  const [defaultServer, setDefaultServer] = useState(1);
  const [server, setServer] = useState(1);
  const [serverFlag, setServerFlag] = useState(4);

  //メッセージ
  const [message, setMessage] = useState("");

  //得点関連
  const plusPoint = (point, setPoint) => {
    if (gameFlag === 1) {
      setPoint(point + 1);
      setServerFlag(serverFlag + 1);
    }
  };
  const minusPoint = (point, setPoint) => {
    if (point > 0) {
      setPoint(point - 1);
      setServerFlag(serverFlag - 1);
      setGameFlag(1);
    }
  };

  //サーブ関連
  const changeServe = () => {
    serverFlag % 4 === 0 || serverFlag % 4 === 1
      ? setServer(defaultServer)
      : setServer(defaultServer === 1 ? 2 : 1);
  };
  const changeServeDeuce = () => {
    serverFlag % 2 === 0
      ? setServer(defaultServer)
      : setServer(defaultServer === 1 ? 2 : 1);
  };
  const changeDefaultServer = (player) => {
    setDefaultServer(player);
  };

  //フラグ関連
  const startGame = () => {
    setGameFlag(1);
  };
  const endGame = () => {
    if (point1 === 11 || point2 === 11) {
      setGameFlag(2);
    }
  };
  const endGameDeuce = () => {
    if (point1 - point2 === 2 || point2 - point1 === 2) {
      setGameFlag(2);
    }
  };

  //メッセージ関連
  const endMessageFix = () => {
    deuce ? setMessage("デュース") : setMessage("");
  };

  //リセット
  const doReset = () => {
    setGameFlag(0);
    setPoint1(0);
    setPoint2(0);
    setDeuce(false);
    setDefaultServer(1);
    setServerFlag(4);
    setMessage("");
  };

  //デュース関連
  useEffect(() => {
    point1 + point2 < 20 ? setDeuce(false) : setDeuce(true);
  }, [point1, point2]);

  //サーブ関連
  useEffect(() => {
    !deuce ? changeServe() : changeServeDeuce();
  }, [point1, point2]);

  useEffect(() => {
    !deuce ? changeServe() : changeServeDeuce();
  }, [point1, point2]);

  useEffect(() => {
    setServer(defaultServer);
  }, [defaultServer]);

  //終了関連
  useEffect(() => {
    !deuce ? endGame() : endGameDeuce();
  }, [point1, point2]);

  //メッセージ関連
  useEffect(() => {
    deuce ? setMessage("デュース") : setMessage("");
  }, [deuce]);
  useEffect(() => {
    gameFlag === 2 ? setMessage("試合終了") : endMessageFix();
  }, [gameFlag]);

  return (
    <div>
      <Layout title="PPboard" desc="卓球のスコアボードだよ">
        <Server server={server} />
        <div className={styles.scoreBord}>
          <Point
            point={point1}
            plusPoint={() => plusPoint(point1, setPoint1)}
            minusPoint={() => minusPoint(point1, setPoint1)}
          />
          <p>-</p>
          <Point
            point={point2}
            plusPoint={() => plusPoint(point2, setPoint2)}
            minusPoint={() => minusPoint(point2, setPoint2)}
          />
        </div>
        <p className={styles.message}>{message}</p>
        <button className={styles.btn} onClick={() => doReset()}>
          Reset
        </button>
        <Modal
          gameFlag={gameFlag}
          changeDefaultServer={changeDefaultServer}
          defaultServer={defaultServer}
          startGame={startGame}
        />
      </Layout>
    </div>
  );
}
