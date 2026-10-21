import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utilis/sorts'
import { DndContext , useSensor, useSensors,MouseSensor, TouchSensor } from '@dnd-kit/core'
import { arrayMove} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])  

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragOver = (event) => {
    const { active, over } = event
    if (!over) return

    const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
    const newIndex = orderedColumns.findIndex(c => c._id === over.id)
    console.log({ activeId: active.id, overId: over.id, oldIndex, newIndex })
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
    const newIndex = orderedColumns.findIndex(c => c._id === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
    setOrderedColumns(dndOrderedColumns)
    // const dndOrderedColumnOrderIds = dndOrderedColumns.map(c => c._id)
    // setOrderedColumns(dndOrderedColumns)
    // console.log('dndOrderedColumns: ', dndOrderedColumns)
    // console.log('dndOrderedColumnOrderIds: ', dndOrderedColumnOrderIds)

  }

  return (
    <DndContext onDragOver={handleDragOver} onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e': '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardcontentheight,
          p: '10px 0'
        }}>
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent

