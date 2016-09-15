import {connect} from 'react-redux';
import {toJs} from 'immutable'; // eslint-disable-line no-unused-vars
import RatingFormView from './RatingFormView';

export default connect(
  state => ({
    taskId: state.getIn(['tasks', 'currentTask', 'value', 'taskId']),
    taskName: state.getIn(['tasks', 'currentTask', 'value', 'taskName']),
    userId: state.getIn(['user', 'value', 'userId']),
    userIsRequestor: state.getIn(['ratingForm', 'isRequestor'])
  })
)(RatingFormView);
