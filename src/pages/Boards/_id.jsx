import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from  './BoardsBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'

function Board() {
  const [ board, setBoard ] = useState(null)
  useEffect(() => {
    const boardID = '6b065fe0faf22d452a9b6ac0'
    fetchBoardDetailsAPI(boardID).then(board => {
      setBoard(board)
    }).catch(error => {
      console.error('Failed to fetch board details:', error)
    })
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh'}}>
      <AppBar />
      <BoardBar board={board || mockData.board} />
      <BoardContent board={board || mockData.board} />
    </Container>
  )
}

export default Board
