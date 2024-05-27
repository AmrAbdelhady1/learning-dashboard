import { useEffect } from "react";
import { useSelector } from "react-redux";
import { SnackbarKey, useSnackbar } from "notistack";
import { removeSnackbar } from "../../redux/reducers";
import { useAppDispatch } from "../../redux/store";
import { snackbarsSelector } from "../../redux/selectors/preferenceSelectors";

let displayed: SnackbarKey[] = [];

const useNotifier = () => {
  const dispatch = useAppDispatch();
  const notifications = useSelector(snackbarsSelector);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          closeSnackbar(key);
          return;
        }

        if (displayed.includes(key)) return;

        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (_event, myKey) => {
            dispatch(removeSnackbar(myKey));
            removeDisplayed(myKey);
          },
        });

        storeDisplayed(key);
      }
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
};

export default useNotifier;

export * from "./SnackbarContainer";
