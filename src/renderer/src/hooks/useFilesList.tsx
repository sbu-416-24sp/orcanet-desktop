import { ActivitiesAtom } from '@/store'
import { useAtom, useAtomValue } from 'jotai'

export const useFilesList = () => {
  const activities = useAtomValue(ActivitiesAtom)

  // const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  // const handleNoteSelect = (index: number) => async () => {
  //   setSelectedNoteIndex(index)

  //   if (onSelect) {
  //     onSelect()
  //   }
  // }

  return {
    activities,
    // selectedNoteIndex,
    // handleNoteSelect
  }
}
