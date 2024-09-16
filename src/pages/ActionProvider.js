import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleEspace = () => {
    const botMessage = createChatBotMessage(
      "Here's Espcae event details!",
      {
        widget: 'Espace',
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleLean = () => {
    const botMessage = createChatBotMessage(
      "Here's lean philosophy event details!",
      {
        widget: 'lean',
      }
    );
    

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleSupport = () => {
    const botMessage = createChatBotMessage(
      "If you need online support you can send to this email:testtc500@gmail.com and our support team will respond to you",
      
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleUpComingEvents = () => {
    const botMessage = createChatBotMessage(
      "there will be more events but currently i can't tell you ",
      
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleOrganize = () => {
    const botMessage = createChatBotMessage(
      "can't give you access to that put the support can contant this email:testtc500@gmail.com",
      
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleError = () => {
    const botMessage = createChatBotMessage(
      "I can't understand you can you repeat that again with another way",
      
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  // Put the handleHello and handleDog function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleLean,
            handleEspace,
            handleSupport,
            handleUpComingEvents,
            handleOrganize,
            handleError,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;