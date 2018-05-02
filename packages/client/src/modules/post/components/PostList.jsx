/*eslint-disable react/display-name*/
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';

import translate from '../../../i18n';
import { SwipeAction, Table, RELAY_PAGINATION, STANDARD_PAGINATION } from '../../common/components/native';

class PostList extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posts: PropTypes.object,
    navigation: PropTypes.object,
    deletePost: PropTypes.func.isRequired,
    loadData: PropTypes.func.isRequired,
    limit: PropTypes.number,
    t: PropTypes.func
  };

  keyExtractor = item => item.node.id.toString();

  renderItemIOS = ({
    item: {
      node: { id, title }
    }
  }) => {
    const { deletePost, navigation, t } = this.props;
    return (
      <SwipeAction
        onPress={() => navigation.navigate('PostEdit', { id })}
        right={{
          text: t('list.btn.del'),
          onPress: () => deletePost(id)
        }}
      >
        {title}
      </SwipeAction>
    );
  };

  renderItemAndroid = ({
    item: {
      node: { id, title }
    }
  }) => {
    const { deletePost, navigation } = this.props;
    return (
      <TouchableOpacity style={styles.postWrapper} onPress={() => navigation.navigate('PostEdit', { id })}>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => deletePost(id)}>
          <FontAwesome name="trash" size={20} style={{ color: '#3B5998' }} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  handlePageChange = (pagination, pageNumber) => {
    const {
      posts: {
        pageInfo: { endCursor }
      },
      limit,
      loadData
    } = this.props;
    if (pagination === RELAY_PAGINATION) {
      loadData(endCursor, 'add');
    } else {
      loadData((pageNumber - 1) * limit, 'replace');
    }
  };

  render() {
    const { loading, posts, t, limit } = this.props;
    const renderItem = Platform.OS === 'android' ? this.renderItemAndroid : this.renderItemIOS;
    const loadMessage = t('post.loadMsg');
    if (loading) {
      return (
        <View style={styles.container}>
          <Text>{loadMessage}</Text>
        </View>
      );
    } else {
      return (
        <Table
          posts={posts}
          loading={loading}
          renderItem={renderItem}
          loadMessage={loadMessage}
          handlePageChange={this.handlePageChange}
          styles={styles}
          keyExtractor={this.keyExtractor}
          limit={limit}
          pagination={STANDARD_PAGINATION}
        />
      );
    }
  }
}

export default translate('post')(PostList);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 18
  },
  iconWrapper: {
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  postWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#000',
    borderBottomWidth: 0.3,
    height: 48,
    paddingLeft: 7
  }
});
