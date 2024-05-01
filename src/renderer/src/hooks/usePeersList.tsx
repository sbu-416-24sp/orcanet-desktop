import { PeersAtom ,getPeers} from '@/store'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useState } from 'react';
import { PeerInfo } from '@shared/models';
import { useLocation } from 'react-router-dom';
// export const usePeersList = () => {
//   const peers = useAtomValue(PeersAtom)

//   // const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

//   // const handleNoteSelect = (index: number) => async () => {
//   //   setSelectedNoteIndex(index)

//   //   if (onSelect) {
//   //     onSelect()
//   //   }
//   // }

//   return {
//     peers,
//     // selectedNoteIndex,
//     // handleNoteSelect
//   }
// }
export const usePeersList = () => {
  const [updatedPeers, setUpdatedPeers] = useState<PeerInfo[]>([]);
  const peers = useAtomValue(PeersAtom);
  const location = useLocation(); 

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const shouldUpdatePeers = location.pathname === '/peers';

    if (shouldUpdatePeers) {
      const fetchPeers = async () => {
        const sortedPeers = await getPeers();
        setUpdatedPeers(sortedPeers);
        console.log('heyy');
      };

      intervalId = setInterval(fetchPeers, 3000);
    }

    // Clean up the interval when the component unmounts or the route changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [location.pathname]); // Add location.pathname as a dependency

  return { peers: updatedPeers.length > 0 ? updatedPeers : peers };
};
