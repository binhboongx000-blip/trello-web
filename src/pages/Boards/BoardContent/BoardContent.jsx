import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utilis/sorts'
import { DndContext, pointerWithin, rectIntersection, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay } from '@dnd-kit/core'
import { arrayMove} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

import  Column from './ListColumns/Column/Column'
import Card, { CardPreview } from './ListColumns/Column/ListCards/Card/Card'
import { generatePlaceholderCard } from '~/utilis/fomatter'


const ACTIVE_DRAG_ITEM_TYPE={
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const pointerFirstCollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args)
  const cardCollisions = pointerCollisions.filter(collision =>
    collision.data?.droppableContainer?.data?.current?.columnId
  )
  if (cardCollisions.length) return cardCollisions
  return pointerCollisions.length ? pointerCollisions : rectIntersection(args)
}

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [initialColumns, setInitialColumns] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const columns = mapOrder(board?.columns, board?.columnOrderIds, '_id').map(column => {
      const cards = (column?.cards ?? []).filter(card => !card?.Fe_PlacehoderCard)
      const normalizedCards = cards.length ? cards : [generatePlaceholderCard(column)]
      return {
        ...column,
        cards: normalizedCards,
        cardOrderIds: normalizedCards.map(card => card._id)
      }
    })
    setOrderedColumns(columns)
  }, [board])

  // Update the board state when a card crosses into a different column.
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      const cardId = activeDraggingCardId ?? active?.id
      const sourceColumnIndex = prevColumns.findIndex(column =>
        column?._id === activeColumn?._id || column?.cards?.some(card => card?._id === cardId)
      )
      const targetColumnIndex = prevColumns.findIndex(column => column?._id === overColumn?._id)

      if (sourceColumnIndex === -1 || targetColumnIndex === -1 || sourceColumnIndex === targetColumnIndex) {
        return prevColumns
      }

      const sourceColumn = prevColumns[sourceColumnIndex]
      const targetColumn = prevColumns[targetColumnIndex]
      const sourceCards = (sourceColumn.cards ?? []).filter(card => !card?.Fe_PlacehoderCard)
      const activeCardIndex = sourceCards.findIndex(card => card?._id === cardId)
      if (activeCardIndex === -1) return prevColumns

      const [activeCard] = sourceCards.splice(activeCardIndex, 1)
      const targetCards = (targetColumn.cards ?? []).filter(card => !card?.Fe_PlacehoderCard)
      const overCardIndex = targetCards.findIndex(card => card?._id === overCardId)
      const activeRect = active?.rect?.current?.translated
      const isBelowOverCard = overCardIndex !== -1 && activeRect && over?.rect &&
        activeRect.top + activeRect.height / 2 > over.rect.top + over.rect.height / 2
      const insertionIndex = overCardIndex === -1
        ? targetCards.length
        : overCardIndex + (isBelowOverCard ? 1 : 0)
      targetCards.splice(insertionIndex, 0, {
        ...(activeCard ?? activeDraggingCardData),
        columnId: targetColumn._id
      })

      const nextColumns = [...prevColumns]
      const sourceCardsWithPlaceholder = sourceCards.length
        ? sourceCards
        : [generatePlaceholderCard(sourceColumn)]
      nextColumns[sourceColumnIndex] = {
        ...sourceColumn,
        cards: sourceCardsWithPlaceholder,
        cardOrderIds: sourceCardsWithPlaceholder.map(card => card._id)
      }
      nextColumns[targetColumnIndex] = {
        ...targetColumn,
        cards: targetCards,
        cardOrderIds: targetCards.map(card => card._id)
      }
      return nextColumns
    })
  }

  const handleDragStart = (event) => {
    // Column updates below are immutable, so the current array is a safe rollback snapshot.
    setInitialColumns(orderedColumns)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over } = event
    if (!active || !over) return

    const activeColumn = orderedColumns.find(column =>
      column?.cards?.some(card => card?._id === active.id)
    )
    const overColumn = orderedColumns.find(column =>
      column?._id === over.id || column?.cards?.some(card => card?._id === over.id)
    )
    // Same-column ordering is committed on drop to avoid rerendering the board on every move.
    if (active.id !== over.id && activeColumn && overColumn && activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        over.id,
        active,
        over,
        activeColumn,
        activeDragItemData?._id,
        activeDragItemData
      )
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      if (!over && initialColumns) {
        setOrderedColumns(initialColumns)
      } else if (over) {
        const activeColumn = orderedColumns.find(column =>
          column?.cards?.some(card => card?._id === active.id)
        )
        const overColumn = orderedColumns.find(column =>
          column?._id === over.id || column?.cards?.some(card => card?._id === over.id)
        )

        if (activeColumn && overColumn && activeColumn._id !== overColumn._id) {
          moveCardBetweenDifferentColumns(
            overColumn,
            over.id,
            active,
            over,
            activeColumn,
            activeDragItemData?._id,
            activeDragItemData
          )
        } else {
          setOrderedColumns(prevColumns => {
            const activeColumnIndex = prevColumns.findIndex(column =>
              column?.cards?.some(card => card?._id === active.id)
            )
            const overColumnIndex = prevColumns.findIndex(column =>
              column?._id === over.id || column?.cards?.some(card => card?._id === over.id)
            )
            if (activeColumnIndex === -1 || activeColumnIndex !== overColumnIndex) return prevColumns

            const column = prevColumns[activeColumnIndex]
            const oldIndex = column.cards.findIndex(card => card?._id === active.id)
            const newIndex = column.cards.findIndex(card => card?._id === over.id)
            if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return prevColumns

            const cards = arrayMove(column.cards, oldIndex, newIndex)
            const nextColumns = [...prevColumns]
            nextColumns[activeColumnIndex] = {
              ...column,
              cards,
              cardOrderIds: cards.map(card => card._id)
            }
            return nextColumns
          })
        }
      }
    } else if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && over && active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      if (oldIndex !== -1 && newIndex !== -1) {
        const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setInitialColumns(null)
  }

  const handleDragCancel = () => {
    if (initialColumns) setOrderedColumns(initialColumns)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setInitialColumns(null)
  }

  return (
    <DndContext
      collisionDetection={pointerFirstCollisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      sensors={sensors}>
      <Box sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e': '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardcontentheight,
          p: '10px 0'
        }}>
        <ListColumns
          columns={orderedColumns}
          selectedItem={selectedItem}
          onSelectItem={setSelectedItem}
        />
        <DragOverlay
          adjustScale={false}
          dropAnimation={{ duration: 180, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}
        >
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <CardPreview card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
