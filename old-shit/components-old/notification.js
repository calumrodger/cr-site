const Notification = (props) => {
  const { title, message, status } = props;

  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification