import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notificationArea = () => (
    <div style={style}>
      {props.notification}
    </div>
  )

  return (
    <div>
      {props.notification !== '' ?
        notificationArea() :
        ''
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)