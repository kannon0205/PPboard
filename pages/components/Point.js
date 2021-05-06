import styles from "../../styles/Home.module.scss";

export default function Point(props) {
  return (
    <div className={styles.point}>
      <p>
        <button className={styles.ptBtn} onClick={() => props.plusPoint()}>
          +
        </button>
      </p>
      <p className={styles.num}>{props.point}</p>
      <p>
        <button className={styles.ptBtn} onClick={() => props.minusPoint()}>
          -
        </button>
      </p>
    </div>
  );
}
