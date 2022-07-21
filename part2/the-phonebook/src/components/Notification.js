const Notification = ({ successNotification, errorNotification }) => {
  const handleNotificationStyles = (color) => {
    return {
      color: color,
      background: "lightgrey",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
    };
  };

  const handleNotificationRender = () => {
    if (errorNotification !== "") {
      return (
        <div style={handleNotificationStyles("red")}>{errorNotification}</div>
      );
    } else if (successNotification !== "") {
      return (
        <div style={handleNotificationStyles("green")}>
          {successNotification}
        </div>
      );
    }
  };

  return <div>{handleNotificationRender()}</div>;
};

export default Notification;
