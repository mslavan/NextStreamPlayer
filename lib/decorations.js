'use strict';

exports.__esModule = true;
exports.SignalIcon = SignalIcon;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _networkDanger = require('./assets/network-danger.png');

var _networkDanger2 = _interopRequireDefault(_networkDanger);

var _networkWarning = require('./assets/network-warning.png');

var _networkWarning2 = _interopRequireDefault(_networkWarning);

var _networkGood = require('./assets/network-good.png');

var _networkGood2 = _interopRequireDefault(_networkGood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SignalIcon(props) {
  if (props.level === 1) {
    return _react2.default.createElement(
      'div',
      { className: 'agora-player__icon' },
      _react2.default.createElement('img', {
        title: 'Poor Network latency',
        src: _networkWarning2.default,
        alt: 'weak-signal'
      })
    );
  } else if (props.level === 2) {
    return _react2.default.createElement(
      'div',
      { className: 'agora-player__icon' },
      _react2.default.createElement('img', {
        title: 'Severe Network latency',
        src: _networkDanger2.default,
        alt: 'poor-signal'
      })
    );
  } else {
    // return (
    //   <div className="agora-player__icon">
    //     <img 
    //       title="Good Network"
    //       src={InfoIcon} 
    //       alt="good-signal" 
    //     />
    //   </div>
    // );
    return null;
  }
}