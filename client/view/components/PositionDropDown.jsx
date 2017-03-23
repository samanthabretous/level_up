import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'semantic-ui-react';
import { selectPosition } from '../../redux/position';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    selectPosition,
  }, dispatch)
);

const mapStateToProps = state => ({
  positions: state.position.positions,
});

const PositionDropDown = ({ positions, selectPosition }) => {
  const allPositions = positions && positions.map(position => (
    { value: position.id, key: position.id, text: position.type }
  ));
  return (
    <Dropdown
      size="huge"
      options={allPositions}
      placeholder="Choose Position"
      onChange={(e, data) => selectPosition(parseInt(data.value))}
    />
  );
};

PositionDropDown.propTypes = {
  positions: PropTypes.arrayOf(PropTypes.object),
  selectPosition: PropTypes.func.isRequired,
};

PositionDropDown.defaultProps = {
  positions: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(PositionDropDown);
