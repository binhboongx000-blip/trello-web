import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utilis/sorts'
import { DndContext , useSensor, useSensors,MouseSensor, TouchSensor,DragOverlay } from '@dnd-kit/core'
import { arrayMove} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import {cloneDeep} from 'lodash'

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

  const updateCardDrop = (columns, activeCardId, overId, reorderWithinColumn = false) => {
    const sourceColumnIndex = columns.findIndex(column =>
      column?.cards?.some(card => card?._id === activeCardId)
    )
    const targetColumnIndex = columns.findIndex(column =>
      column?._id === overId || column?.cards?.some(card => card?._id === overId)
    )

    if (sourceColumnIndex === -1 || targetColumnIndex === -1) return columns

    const sourceColumn = columns[sourceColumnIndex]
    const targetColumn = columns[targetColumnIndex]
    const sourceCards = [...(sourceColumn.cards ?? [])]
    const targetCards = sourceColumnIndex === targetColumnIndex
      ? sourceCards
      : [...(targetColumn.cards ?? [])]
    const activeCardIndex = sourceCards.findIndex(card => card?._id === activeCardId)
    if (activeCardIndex === -1) return columns

    if (sourceColumnIndex === targetColumnIndex) {
      const overCardIndex = targetCards.findIndex(card => card?._id === overId)
      if (!reorderWithinColumn || overCardIndex === -1 || activeCardIndex === overCardIndex) return columns

      const reorderedCards = arrayMove(targetCards, activeCardIndex, overCardIndex)
      return columns.map((column, index) => index === sourceColumnIndex
        ? { ...column, cards: reorderedCards, cardOrderIds: reorderedCards.map(card => card._id) }
        : column
      )
    }

    const [activeCard] = sourceCards.splice(activeCardIndex, 1)
    const overCardIndex = targetCards.findIndex(card => card?._id === overId)
    const insertionIndex = overCardIndex === -1 ? targetCards.length : overCardIndex
    const updatedTargetCards = [
      ...targetCards.slice(0, insertionIndex),
      { ...activeCard, columnId: targetColumn._id },
      ...targetCards.slice(insertionIndex)
    ]

    return columns.map((column, index) => {
      if (index === sourceColumnIndex) {
        return { ...column, cards: sourceCards, cardOrderIds: sourceCards.map(card => card._id) }
      }
      if (index === targetColumnIndex) {
        return { ...column, cards: updatedTargetCards, cardOrderIds: updatedTargetCards.map(card => card._id) }
      }
      return column
    })
  }

  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over } = event
    if (!active || !over) return

    setOrderedColumns(prevColumns => {
      const activeColumnIndex = prevColumns.findIndex(column =>
        column?.cards?.some(card => card?._id === active.id)
      )
      const overColumnIndex = prevColumns.findIndex(column =>
        column?._id === over.id || column?.cards?.some(card => card?._id === over.id)
      )

      if (activeColumnIndex === -1 || overColumnIndex === -1) return prevColumns
      if (active.id === over.id) return prevColumns

      const activeColumn = prevColumns[activeColumnIndex]
      const overColumn = prevColumns[overColumnIndex]
      const activeCards = activeColumn.cards ?? []
      const overCards = overColumn.cards ?? []
      const activeCardIndex = activeCards.findIndex(card => card?._id === active.id)
      if (activeCardIndex === -1) return prevColumns
      const overCardIndex = overCards.findIndex(card => card?._id === over.id)

      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      const newCardIndex = overCardIndex >= 0
        ? overCardIndex + modifier
        : overCards.length

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns[activeColumnIndex]
      const nextOverColumn = nextColumns[overColumnIndex]
      nextActiveColumn.cards ??= []
      nextOverColumn.cards ??= []
      const [activeCard] = nextActiveColumn.cards.splice(activeCardIndex, 1)

      if (activeColumnIndex !== overColumnIndex) {
        activeCard.columnId = overColumn._id
      }

      const insertionIndex = Math.max(
        0,
        Math.min(
          newCardIndex - (activeColumnIndex === overColumnIndex && activeCardIndex < newCardIndex ? 1 : 0),
          nextOverColumn.cards.length
        )
      )
      nextOverColumn.cards.splice(insertionIndex, 0, activeCard)
      nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      return nextColumns
    })
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && over) {
      setOrderedColumns(columns => updateCardDrop(columns, active.id, over.id, true))
    } else if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && over && active.id !== over.id) {
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
      onDragOver={handleDragOver}
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
