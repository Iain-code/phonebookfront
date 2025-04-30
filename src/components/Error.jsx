const Error = ({ error }) => {
    
    const errorStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      }

    if (error === null) {
        return null
    }

    return (
        <div className="error" style={errorStyle}>
            {error}
        </div>
    )
}

export default Error