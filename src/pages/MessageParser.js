// in MessageParser.jsx
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('hello')) {
      actions.handleHello();
    }
    if (message.includes('Hello')) {
      actions.handleHello();
    }
    if (message.includes('hi')) {
      actions.handleHello();
    }
    if (message.includes('Hi')) {
      actions.handleHello();
    }
    if (message.includes('lean')) {
      actions.handleLean();
    }
    if (message.includes('Lean')) {
      actions.handleLean();
    }
    if (message.includes('Espace')) {
      actions.handleEspace();
    }
    if (message.includes('espace')) {
      actions.handleEspace();
    }
    if (message.includes('support')) {
      actions.handleSupport();
    }
    if (message.includes('Support')) {
      actions.handleSupport();
    }
    if (message.includes('Problem')) {
      actions.handleSupport();
    }
    if (message.includes('problem')) {
      actions.handleSupport();
    }
    if (message.includes('issue')) {
      actions.handleSupport();
    }
    if (message.includes('Issue')) {
      actions.handleSupport();
    }
    if (message.includes('agent')) {
      actions.handleSupport();
    }
    if (message.includes('Agent')) {
      actions.handleSupport();
    }
    if (message.includes('next')){
      actions.handleUpComingEvents();
    }
    if (message.includes('Next')){
      actions.handleUpComingEvents();
    }
    if (message.includes('organize')){
      actions.handleOrganize();
    }
    if (message.includes('Organize')){
      actions.handleOrganize();
    }
    if (message.includes('.')){
      actions.handleError();
    }
    
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;