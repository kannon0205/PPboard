import Head from "next/head";
import styles from "../../styles/Home.module.scss";

export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={props.desc} />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Noto+Sans+JP:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className={styles.Layout}>{props.children}</div>
    </div>
  );
}
