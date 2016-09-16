import * as TaskState from './TaskState';
// import * as NavigationState from '../../modules/navigation/NavigationState';
import _ from 'underscore';
import React, {PropTypes} from 'react';
import {
  Text,
  View,
  ListView,
  ActivityIndicator
} from 'react-native';
import styles from '../../styles';
import ListItemWithIcon from '../../components/ListItemWithIcon';

const TaskView = React.createClass({
  propTypes: {
    tasks: PropTypes.array,
    userName: PropTypes.string,
    userProfilePhoto: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  },
  componentDidMount() {
    this.tasks();
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.tasks !== this.props.tasks) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._getListViewData(nextProps.tasks))
      });
    }
  },
  _getListViewData(tasks) { // swap this out for halpers function later
    const dispatch = this.props.dispatch;
    if (!tasks.length) {
      return [];
    }
    return tasks.map((item) => _.extend(
      item.task.properties,
      {
        taskId: item.task._id, // taskId isn't included in properties
        requestorUsername: item.user.properties.username,
        requestorRating: item.user.properties.rating,
        dispatch
      }
    ));
  },
  tasks() {
    this.props.dispatch(TaskState.tasks());
  },
  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' color='#BDBDBD' style={styles.loadCircle}/>
        <Text style={styles.loadText}>Loading Tasks...</Text>
      </View>
    );
  },
  renderListView() {
    return (
      <View style={styles.container}>

        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={ListItemWithIcon}
        />

      </View>
    );
  },
  render() {
    return this.props.loading
      ? this.renderLoadingView()
      : this.renderListView();
  }
});

export default TaskView;
