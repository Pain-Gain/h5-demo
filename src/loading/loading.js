import { Toast, WingBlank, Button } from 'antd-mobile';


function loadingToast() {
  Toast.loading('Loading...', 1, () => {
    console.log('Load complete !!!');
  });
}

class ToastExample extends React.Component {
  componentDidMount() {
    Toast.loading('Loading...', 30, () => {
      console.log('Load complete !!!');
    });

    setTimeout(() => {
      Toast.hide();
    }, 3000);
  }
  render() {
    return (
      <WingBlank>
        <Button onClick={loadingToast}>loading</Button>
      </WingBlank>
    );
  }
}

ReactDOM.render(<ToastExample />, mountNode);