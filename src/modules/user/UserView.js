import * as UserState from './UserState';
// import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView
} from 'react-native';
import colors from '../../styles/colors';
import stars from '../../styles/stars';

const UserView = React.createClass({
  propTypes: {
    userName: PropTypes.string,
    userId: PropTypes.number,
    userProfilePhoto: PropTypes.string,
    coins: PropTypes.number,
    rating: PropTypes.number,
    completedTasks: PropTypes.array,
    assignedTasks: PropTypes.array,
    bio: PropTypes.string,
    // tasksCompleted: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  reset() {
    this.props.dispatch(UserState.reset());
  },
  renderUserInfo() {
    if (!this.props.userName) {
      return (
        <View>
          <Text style={styles.linkButton}>
            Please log in to see your profile.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.userContainer}>

        <View style={styles.userTitleContainer}>
          <Text style={styles.usernameText}>
            {this.props.userName}
          </Text>
          <Image
            style={styles.userProfilePhoto}
            source={{
              uri: this.props.userProfilePhoto,
              width: 80,
              height: 80
            }}
          />
        </View>

        <Image
          source={stars[(Math.round(this.props.rating * 2) / 2).toFixed(1)]}
          style={{height: 25, width: 125, margin: 15}}
        />

        <View style={styles.detailSeperator}/>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Coins: {this.props.coins}</Text>
          <Text style={styles.scoreText}>Completed Tasks: #</Text>
        </View>

        <Text style={{paddingLeft: 20, paddingRight: 20}}>{this.props.bio}</Text>

        <View style={{marginTop: 15, padding: 20, paddingTop: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor}}>
          <Image style={{flex: 1}} source={require('../../styles/icons/logo.png')}/>
          <Text style={styles.buttonText}>backScratch</Text>
        </View>

      </View>
    );
  },
  render() {
    return (
      <View style={styles.container}>
        {this.renderUserInfo()}
      </View>
    );
  }
});

const circle = {
  borderWidth: 0,
  borderRadius: 40,
  width: 80,
  height: 80
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white
  },
  userTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 15,
    padding: 15,
    backgroundColor: colors.primaryColor
  },
  scoreContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  scoreText: {
    fontSize: 20,
    margin: 10
  },
  formText: {
    fontSize: 30
  },
  userContainer: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingBottom: 1000
  },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center',
    marginLeft: 20
  },
  button: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 5,
    margin: 20,
    shadowColor: colors.black,
    shadowOpacity: .5,
    shadowOffset: {height: 5}
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.white,
    backgroundColor: colors.primaryColor
  },
  ratingText: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10
  },
  recentTaskText: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 10
  },
  usernameText: {
    textAlign: 'center',
    fontSize: 25,
    color: colors.white
  },
  detailSeperator: {
    width: 350,
    height: 1,
    backgroundColor: colors.divider
  }
});

export default UserView;
