const Notification = (props) => {
  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    // statusClasses = classes.success;
  }

  if (status === 'error') {
    // statusClasses = classes.error;
  }

  // const cssClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification