import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import UsersList from '../components/UsersListView';
import UsersFilter from '../components/UsersFilterView';
import {
  withUsersState,
  withUsers,
  withUsersDeleting,
  withOrderByUpdating,
  withFilterUpdating
} from './UserOperations';

import usersWithSubscription from './UsersWithSubscription';

class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isOpenFilter = !!this.props.navigation.getParam('isOpenFilter');
    return (
      <View style={styles.container}>
        {isOpenFilter && (
          <View style={styles.filterContainer}>
            <UsersFilter {...this.props} />
          </View>
        )}
        <View style={styles.usersListContainer}>
          <UsersList {...this.props} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  filterContainer: {
    flex: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    marginBottom: 15,
    justifyContent: 'center'
  },
  usersListContainer: {
    flex: 8,
    marginTop: 15
  }
});

Users.propTypes = {
  filter: PropTypes.object,
  navigation: PropTypes.object,
  users: PropTypes.array,
  subscribeToMore: PropTypes.func,
  loading: PropTypes.bool
};

export default compose(
  withUsersState,
  withUsers,
  withUsersDeleting,
  withOrderByUpdating,
  withFilterUpdating,
  usersWithSubscription
)(Users);
