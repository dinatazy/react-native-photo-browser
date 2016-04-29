import React, {
  PropTypes,
  ListView,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';

import { Photo } from './media';

export default class GridContainer extends React.Component {

  static propTypes = {
    style: View.propTypes.style,
    dataSource: PropTypes.instanceOf(ListView.DataSource).isRequired,
    displaySelectionButtons: PropTypes.bool,
    onPhotoTap: PropTypes.func,

    /*
     * refresh the list to apply selection change
     */
    onMediaSelection: PropTypes.func,
  };

  static defaultProps = {
    displaySelectionButtons: false,
    onPhotoTap: () => {},
  };

  constructor(props, context) {
    super(props, context);

    this._renderRow = this._renderRow.bind(this);

    this.state = {};
  }

  _renderRow(media: Object, sectionID: number, rowID: number) {
    const {
      displaySelectionButtons,
      onPhotoTap,
      onMediaSelection,
    } = this.props;

    return (
      <TouchableHighlight onPress={() => onPhotoTap(parseInt(rowID, 10))}>
        <View style={styles.row}>
          <Photo
            thumbnail
            progressImage={require('../Assets/hourglass.png')}
            displaySelectionButtons={displaySelectionButtons}
            uri={media.thumb || media.photo}
            selected={media.selected}
            onSelection={(isSelected) => {
              onMediaSelection(rowID, isSelected);
            }}
          />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { dataSource } = this.props;

    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={dataSource}
          initialListSize={21}
          pageSize={3}
          scrollRenderAheadDistance={500}
          renderRow={this._renderRow}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
  },
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    justifyContent: 'center',
    margin: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 1,
  },
  thumb: {
    width: 100,
    height: 100,
  },
});