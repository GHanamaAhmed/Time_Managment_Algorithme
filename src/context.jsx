import React, { createContext, useState } from "react";
const ProcessContext = createContext();
export default function Context({ children }) {
  const [proccessus, setProccessus] = useState([]);
  const [nOfP, setNOfP] = useState(0);
  const [nOfE, setNOfE] = useState([]);
  const [messages, setMessages] = useState([]);
  const senderMessage = () => {
    let sender = messages.findIndex(
      (v, i) => v.fromE && v.fromP && (!v.toE || !v.toP)
    );
    return sender;
  };
  const sendMessage = (p, e) => {
    if (senderMessage() == -1 && !isRepeat(p, e)) {
      setMessages([...messages, { fromP: p, fromE: e, toE: 0, toP: 0 }]);
    }
  };
  const reciveMessage = (p, e) => {
    if (senderMessage() >= 0 && !isRepeat(p, e)) {
      setMessages((prev) => {
        let newArray = prev;
        newArray[senderMessage()].toE = e;
        newArray[senderMessage()].toP = p;
        return [...newArray];
      });
    }
  };
  const isRepeat = (p, e) => {
    return (
      messages.findIndex(
        (v, i) => (v.fromP == p && v.fromE == e) || (v.toP == p && v.toE == e)
      ) >= 0
    );
  };
  return (
    <ProcessContext.Provider
      value={{
        nOfP,
        setNOfP,
        nOfE,
        setNOfE,
        messages,
        setMessages,
        senderMessage,
        sendMessage,
        reciveMessage,
        isRepeat,
        proccessus, setProccessus
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
}
export { ProcessContext };
