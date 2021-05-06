//css
import styles from "../../styles/Home.module.scss";

export default function Modal(props) {
  return (
    <div className={props.gameFlag === 0 ? styles.db : styles.dn}>
      <div className={styles.modal}>
        <div className={styles.container}>
          <div className={styles.players}>
            <div>
              <button
                className={styles.pn}
                onClick={() => props.changeDefaultServer(1)}
              >
                <span className={props.defaultServer === 1 ? styles.gold : ""}>
                  Player1
                </span>
              </button>
            </div>
            <div>
              <button
                className={styles.pn}
                onClick={() => props.changeDefaultServer(2)}
              >
                <span className={props.defaultServer === 2 ? styles.gold : ""}>
                  Player2
                </span>
              </button>
            </div>
          </div>
          <h2>先攻を選択してください</h2>
          <button className={styles.btn} onClick={() => props.startGame()}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
