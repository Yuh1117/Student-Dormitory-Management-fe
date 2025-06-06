import { useState,createContext } from 'react';
export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  return (
    <RoomContext.Provider value={{
      selectedRoom,
      setSelectedRoom,
      selectedInvoice,
      setSelectedInvoice,
    }}>
      {children}
    </RoomContext.Provider>
  );
};