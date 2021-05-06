import styles from "../../styles/Home.module.scss";

export default function Server(props) {
  return (
    <div className={styles.server}>
      <p className={props.server === 1 ? styles.gold : ""}>●</p>
      <p className={styles.str}>サーブ</p>
      <p className={props.server === 2 ? styles.gold : ""}>●</p>
    </div>
  );
}
