import { useRouteError } from "react-router";
import styles from "./RoutingError.module.css";

function RoutingError() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className={styles.routingError}>
      <h1>An error has occurred</h1>
      {error.data && <p>{error.data}</p>}
      <p>
        {error.statusText} {error.status}
      </p>
    </div>
  );
}

export default RoutingError;
