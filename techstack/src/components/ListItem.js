import React, { Component } from 'react';
import { Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';


class ListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }
  renderDescription() {
    const { library, expanded } = this.props;

    if (expanded) {
      return (
        <CardSection>
          <Text style={{ flex: 1, paddingLeft: 5, paddingRight: 5 }}>
            {library.description}
          </Text>
        </CardSection>
      );
    }
  }

  render() {
    const { titleStyle } = styles;
    const { id, title } = this.props.library;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectLibrary(id)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

// ownProps is the same as this.props
const mapStateToProps = (state, ownProps) => {
  // make some pre-calculations for the selected library
  const expanded = state.selectedLibraryId === ownProps.library.id;
  return { expanded };
};

// actions argument transforms the normal function
// in a kind of dispatchable action into the redux store
// and it takes all the actions and pass them to the component as props
export default connect(mapStateToProps, actions)(ListItem);
