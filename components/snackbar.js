import Snackbar from 'react-native-snackbar';
import Colors from '../constants/Color';

function undoTask(fn, task) {
  Snackbar.show({
    text: 'Success',
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: 'green',
    action: {
      text: 'UNDO',
      textColor: '#fff',
      onPress: () => {
        fn(task);
      },
    },
  });
}

function showError(fn, error) {
  Snackbar.show({
    text: error.message || error,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: Colors.cancel,
    action: {
      text: 'try again',
      textColor: '#fff',
      onPress: () => {
        fn();
      },
    },
  });
}

const snackbar = {
  undoBar: undoTask,
  errorBar: showError,
};

export default snackbar;
