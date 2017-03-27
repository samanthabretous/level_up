import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'semantic-ui-react';
import { selectSource } from '../../redux/source';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    selectSource,
  }, dispatch)
);

const mapStateToProps = state => ({
  sources: state.source.sources,
});

const SourceDropDown = ({ sources, selectSource }) => {
  const allSources = sources && sources.map(source => (
    { value: source.id, key: source.id, text: source.type }
  ));
  return (
    <Dropdown
      button fluid closeOnChange
      options={allSources}
      placeholder="Choose Source"
      onChange={(e, data) => selectSource(JSON.parse(data.value))}
    />
  );
};

SourceDropDown.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.object),
  selectSource: PropTypes.func.isRequired,
};

SourceDropDown.defaultProps = {
  sources: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(SourceDropDown);
