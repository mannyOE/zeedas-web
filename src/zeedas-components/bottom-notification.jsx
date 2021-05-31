import React from "react";
import ee from "event-emitter";

const emitter = new ee();

export const notify = (message, type) => {
  emitter.emit("notification", message, type);
};

class BottomNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bottom: -100,
      message: "",
      backgroundColor: "",
      show: false,
    };

    this.timeout = null;
    emitter.on("notification", (message, type) => {
      this.onShow(message, type);
    });
  }

  onShow = (message, type) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.setState({ bottom: 0 }, () => {
        this.timeout = setTimeout(() => {
          this.showNotification(message, type);
        }, 500);
      });
    } else {
      this.showNotification(message, type);
    }
  };

  showNotification = (message, type) => {
    this.setState(
      {
        show: true,
        bottom: 0,
        message,
        backgroundColor: type,
      },
      () => {
        this.timeout = setTimeout(() => {
          this.setState({
            show: false,
            bottom: -100,
            message: "",
          });
        }, 5000);
      },
    );
  };

  render() {
    const {
      backgroundColor, message, bottom, show,
    } = this.state;
    return (
      <>
        <div
          className={`bottom-notification ${
            show ? `notification-bg-${backgroundColor}` : "hidden"
          }`}
          style={{
            bottom: `${bottom}px`,
          }}
        >
          {message}
        </div>
      </>
    );
  }
}

export default BottomNotification;
