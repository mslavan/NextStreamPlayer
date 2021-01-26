"use strict";

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = (_temp = _class = function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.startNetworkDetector = function () {
      _this.stopNetworkDetector();
      _this._networkDetector = setInterval(function () {
        var stream = _this.props.stream;
        stream.getStats(function (e) {
          if (stream.local) {
            // if local stream, use accessDelay
            var accessDelay = Number.parseInt(e.accessDelay, 10);
            if (isNaN(accessDelay)) {
              return;
            }
            if (accessDelay < 100) {
              _this.setState({
                networkStatus: 0
              });
            } else if (accessDelay < 200) {
              _this.setState({
                networkStatus: 1
              });
            } else {
              _this.setState({
                networkStatus: 2
              });
            }
          } else {
            // if remote stream, use endToEndDelay
            var endToEndDelay = Number.parseInt(e.endToEndDelay, 10);
            if (isNaN(endToEndDelay)) {
              return;
            }
            if (endToEndDelay < 200) {
              _this.setState({
                networkStatus: 0
              });
            } else if (endToEndDelay < 400) {
              _this.setState({
                networkStatus: 1
              });
            } else {
              _this.setState({
                networkStatus: 2
              });
            }
          }
        });
      }, 1500);
    };

    _this.stopNetworkDetector = function () {
      if (_this._networkDetector) {
        clearInterval(_this._networkDetector);
      }
    };

    _this._getSnapshot = function () {
      // init snapshot the first time we got it
      var stream = _this.props.stream;
      return {
        id: stream.getId(),
        hasVideo: stream.hasVideo() || stream.hasScreen(),
        hasAudio: stream.hasAudio(),
        videoOn: stream.isVideoOn(),
        audioOn: stream.isAudioOn(),
        playing: stream.isPlaying()
      };
    };

    _this._handleStreamSideEffects = function () {
      if (!_this.props.autoChange) {
        return;
      }
      // deal with side effect
      var $prev = _this._snapshot;
      var $stream = _this.props.stream;

      // check video
      if ((0, _utils.xor)($prev.videoOn, _this.props.video)) {
        if ($stream.hasVideo()) {
          _this.props.video ? $stream.enableVideo() : $stream.disableVideo();
        }
      }

      // check audio
      if ((0, _utils.xor)($prev.audioOn, _this.props.audio)) {
        if ($stream.hasAudio()) {
          _this.props.audio ? $stream.enableAudio() : $stream.disableAudio();
        }
      }
    };

    try {
      _this._snapshot = _this._getSnapshot();
    } catch (err) {
      throw new Error("The stream you passed is invalid!");
    }
    _this.state = {
      networkStatus: 0
    };
    return _this;
  }
  // _audioDetector: IntervalID


  _default.prototype.componentDidUpdate = function componentDidUpdate() {
    this._handleStreamSideEffects();

    // check detector
    if (this.props.networkDetect) {
      this.startNetworkDetector();
    } else {
      this.stopNetworkDetector();
    }

    this._snapshot = this._getSnapshot();
  };

  _default.prototype.componentDidMount = function componentDidMount() {
    this._handleStreamSideEffects();

    // check detector
    if (this.props.networkDetect) {
      this.startNetworkDetector();
    }

    // play stream
    var stream = this.props.stream;
    stream.play("agora--player__" + stream.getId());
  };

  _default.prototype.componentWillUnmount = function componentWillUnmount() {
    // check detecor
    this.stopNetworkDetector();

    // stop stream
    var stream = this.props.stream;
    if (stream && stream.isPlaying()) {
      stream.stop();
      // stream.local && stream.close();
    }
  };

  _default.prototype.render = function render() {
    var className = "agora-player__box \n    " + (this.props.fit === "cover" ? "cover" : "contain") + " \n    " + (this.props.className || "") + " ";

    var id = "agora--player__" + this.props.stream.getId();

    var _props = this.props,
        onClick = _props.onClick,
        onDoubleClick = _props.onDoubleClick,
        style = _props.style;

    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      _react2.default.createElement(
        "style",
        null,
        "\n          .agora-player__box {\n            position: relative;\n            width: 240px;\n            height: 180px;\n          }\n          .agora-player__placeholder {\n            position: absolute;\n            z-index: 1;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background: #EEEEEE;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n          }\n          .agora-player__box.contain video{\n            left: 0;\n            object-fit: contain!important;\n          }\n          .agora-player__box.cover video{\n            left: 0;\n            object-fit: cover!important;\n          }\n          .agora-player__decorations {\n            position: absolute;\n            top: 5px;\n            left: 5px;\n            z-index: 2;\n            display: flex;\n            white-space: nowrap;\n          }\n          .agora-player__icon {\n            display: inline-flex;\n            margin: 3px;\n            width: 24px;\n            height: 24px;\n            justify-content: center;\n            align-items: center;\n            transition: .3s all ease-in-out;\n          }\n          .agora-player__icon img {\n            max-width: 100%;\n          }\n          .agora-player__label {\n            position: absolute;\n            text-align: center;\n            font-size: 16px;\n            font-weight: bold;\n            color: white;\n            height: 24px;\n            width: 100%;\n            bottom: 0;\n            z-index: 2;\n            right: 0;\n          }\n          "
      ),
      _react2.default.createElement(
        "div",
        {
          onClick: onClick,
          onDoubleClick: onDoubleClick,
          style: style,
          className: className,
          id: id
        },
        (!this.props.video || !(this._snapshot && this._snapshot.hasVideo)) && _react2.default.createElement(
          "div",
          { className: "agora-player__placeholder" },
          this.props.placeholder ? this.props.placeholder : null
        ),
        _react2.default.createElement(
          "div",
          { className: "agora-player__decorations" },
          this.props.prependIcon,
          this.props.speaking && _react2.default.createElement("div", { className: "agora-player__icon" }),
          this.props.appendIcon
        ),
        this.props.label && _react2.default.createElement(
          "div",
          { className: "agora-player__label" },
          this.props.label
        )
      )
    );
  };

  return _default;
}(_react.Component), _class.defaultProps = {
  stream: undefined,
  video: true,
  audio: true,
  fit: "cover",

  networkDetect: false,
  speaking: false,
  // audioDetect: false,
  autoChange: true,
  className: "",
  style: {}
}, _temp);

exports.default = _default;
module.exports = exports["default"];