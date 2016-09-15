import React, {PropTypes} from 'react';
import _ from 'underscore';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native';
import {
  Form,
  Separator,
  InputField,
  PickerField
} from 'react-native-form-generator';
import styles from '../../../styles';
import colors from '../../../styles/colors';
import * as RatingFormStateActions from './RatingFormState';
import * as NavigationStateActions from '../../navigation/NavigationState';

const RatingFormView = React.createClass({
  propTypes: {
    userId: PropTypes.number.isRequired,
    taskId: PropTypes.number.isRequired,
    taskName: PropTypes.string.isRequired,
    userIsRequestor: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  submitTask() {
    let isFormValid = true; // fix this!!

    // let isFormValid = this.refs.taskForm.values.taskName &&
    //        this.refs.taskForm.values.desc &&
    //        this.refs.taskForm.values.type &&
    //        this.refs.taskForm.values.difficulty &&
    //        this.refs.taskForm.values.address;

    if (isFormValid) {
      let formData = this.refs.taskForm.values;
      formData = _.extend(formData, {
        Id: this.props.userId
      });
      formData.SubmittedRating = parseInt(formData.SubmittedRating, 10);
      console.log(formData);
      this.props.dispatch(RatingFormStateActions.setModalVisible(false));
      this.props.dispatch(RatingFormStateActions.rateTask(
        this.props.taskId,
        formData,
        this.props.userIsRequestor
      ));
      this.props.dispatch(NavigationStateActions.switchTab(1));
    }
  },
  render() {
    return (
      <View style={styles.formRatingContainer}>
        <Text style={styles.formTextTitle}>{this.props.taskName}</Text>
        <Text style={{fontSize: 25, color: colors.white, fontWeight: '500'}}>Completed!</Text>
        <Text style={styles.formTextSubTitle}>Please fill out the rating form</Text>

        <View style={styles.longDetailSeperator} />

        <ScrollView style={{backgroundColor: colors.lightPrimaryColor}}>
          <Form ref='taskForm'
            onFocus={this.handleFormFocus}
            style={{backgroundColor: colors.lightPrimaryColor, marginTop: 90}}
          >
            <PickerField
              ref='SubmittedRating'
              label='User Rating'
              options={{
                '': '',
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5'
              }}
              helpText='Rate the other user. 5 being the best!'
            />
            <Separator />
            <InputField
              multiline={true}
              ref='Comment'
              placeholder='Comments'
              helpText={'Include comments about your experience with the other user. We will save these comments for quality assurance purposes.'}
            />
          </Form>
        </ScrollView>
        <View style={styles.longDetailSeperator} />
        <TouchableOpacity
          style={styles.button}
          onPress={this.submitTask}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

export default RatingFormView;
