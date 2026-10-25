import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utilis/sorts'
import { DndContext , useSensor, useSensors,MouseSensor, TouchSensor,DragOverlay } from '@dnd-kit/core'
import { arrayMove} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

import  Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'


const ACTIVE_DRAG_ITEM_TYPE={
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // const handleDragOver = (event) => {
  //   const { active, over } = event
  //   if (!over) return

  //   const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
  //   const newIndex = orderedColumns.findIndex(c => c._id === over.id)
  //   console.log({ activeId: active.id, overId: over.id, oldIndex, newIndex })
  // }

  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      if (oldIndex !== -1 && newIndex !== -1) {
        const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      // onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}>
      <Box sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e': '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardcontentheight,
          p: '10px 0'
        }}>
        <ListColumns columns={orderedColumns} />
        <DragOverlay>
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
