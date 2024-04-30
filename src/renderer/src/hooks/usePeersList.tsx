import { PeersAtom ,getPeers} from '@/store'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useState } from 'react';
import { PeerInfo } from '@shared/models';
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

  useEffect(() => {
    const fetchPeers = async () => {
      const sortedPeers = await getPeers();
      setUpdatedPeers(sortedPeers);
      console.log('heyy');
    };

    const intervalId = setInterval(fetchPeers, 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return { peers: updatedPeers.length > 0 ? updatedPeers : peers };
};
