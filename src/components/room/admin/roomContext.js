import { useState,createContext } from 'react';
export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null); // 👉 Thêm dòng này

  return (
    <RoomContext.Provider value={{
      selectedRoom,
      setSelectedRoom,
      selectedInvoice,
      setSelectedInvoice, // 👉 Và dòng này
    }}>
      {children}
    </RoomContext.Provider>
  );
};