const Notification = ({ message }) => {
    
  const messageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
      return null
    }
  
    return (
      <div className='message' style={messageStyle}>
        {message}
      </div>
    )
  }

  export default Notification;