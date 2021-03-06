import Button from "./button";
import classes from "../../styles/modal.module.css";
import { useRouter } from "next/router";

function Modal(props) {
  const {url}=props;
  const router = useRouter();
  async function ok() {
    try {
      const result = await props.ok(props.id);
      props.setResult(result.message);
      props.isLoading();
      if (props.type=== "delete") router.replace("/books");
      else props.buttonX();
    } catch (error) {
      props.setError(error.message);
    }
  }

  if (props.show) {
    return (
      <div className={classes.modal}>
        <div className={classes.modalDialog}>
          <div className={classes.modalContent}>
            <div className={classes.modalHeader}>
              <button className={classes.close} onClick={props.buttonX}>
                <span>&times;</span>
              </button>
              <h4 className={`${classes.modalTitle} ${classes.h4}`}>
                {props.modalTitle}
              </h4>
            </div>
            <div className={classes.modalBody}>
              <p>{props.modalBody}</p>
            </div>
            <div className={classes.modalFooter}>
              <Button
                onClick={ok}
                text={props.text}
                color={props.color}
                form="circular"
              />
              <Button
                onClick={props.buttonX}
                text="Cancelar"
                color="red"
                form="circular"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Modal;
