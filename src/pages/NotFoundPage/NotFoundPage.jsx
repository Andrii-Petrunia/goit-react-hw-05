import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1>Page not found</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default NotFoundPage;
