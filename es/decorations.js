import React, { Component } from 'react';
import DangerIcon from './assets/network-danger.png';
import WarnIcon from './assets/network-warning.png';
import InfoIcon from './assets/network-good.png';

export function SignalIcon(props) {
  if (props.level === 1) {
    return React.createElement(
      'div',
      { className: 'agora-player__icon' },
      React.createElement('img', {
        title: 'Poor Network latency',
        src: WarnIcon,
        alt: 'weak-signal'
      })
    );
  } else if (props.level === 2) {
    return React.createElement(
      'div',
      { className: 'agora-player__icon' },
      React.createElement('img', {
        title: 'Severe Network latency',
        src: DangerIcon,
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