// import { createContext, useContext, useState } from "react";

// export const SoundMuteContext = createContext();

// export function useSoundMute() {
//   return useContext(SoundMuteContext);
// }

// export function SoundMuteProvider({ children }) {
//   const [isMuted, setIsMuted] = useState(true);
//     debugger
//   const toggleMute = () => {
//     setIsMuted((prevMute) => !prevMute);
//   };

//   return (
//     <SoundMuteContext.Provider value={{ isMuted, toggleMute }}>
//       {children}
//     </SoundMuteContext.Provider>
//   );
// }
