import jquery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../app/reducers';

// Set up testing environment to run like a browser
// but in the node.js

// Create a fake DOM
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;

// Hook jquery in the fake version of the DOM
const $ = jquery(global.window);

// Build 'renderComponent' helper that should render
// a given react class
function renderComponent(ComponentClass, props, state) {
  // render component to the virtual DOM
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  // Return the corresponding native browser DOM element
  const nativeDOMNode = ReactDOM.findDOMNode(componentInstance);

  // Wrap with jquery call so we can get access to
  // matchers from chai-jquery
  return $(nativeDOMNode);
}

// Build helper for simulating events
// Every jquery instance will have access to simulate func
$.fn.simulate = function simulate(eventName, value) {
  if (value) {
    // val is jquery method that set the value to jquery element
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};


// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };
