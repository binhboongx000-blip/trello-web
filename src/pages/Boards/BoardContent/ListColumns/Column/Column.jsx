import Box from '@mui/material/Box'
import React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utilis/sorts'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close' 


function Column({ column, selectedItem, onSelectItem }) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id: column._id, data: {...column}})
  const dndKidColumnStyle = {
    // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
   };

    const id = React.useId()
    const buttonId = `${id}-button`
    const menuId = `${id}-menu`
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => { setAnchorEl(event.currentTarget)}
    const handleClose = () => { setAnchorEl(null) }
    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

    const [openNewCardFrom, setOpenNewCardFrom] = React.useState(false)
      const toggleOpenNewCardFrom = () => setOpenNewCardFrom(open => !open)
    
      const [newCardTitle, setNewCardTitle] = React.useState('')
      const addNewCard = () =>{
        if (!newCardTitle){
          // console.error('please enter column title')
          return
        }
        toggleOpenNewCardFrom()
        setOpenNewCardFrom('')
    
      }
    
  return (
      <div ref={setNodeRef} style={dndKidColumnStyle} {...attributes} >
        <Box
          {...listeners}
          onClick={() => onSelectItem?.({ type: 'column', id: column._id })}
          sx={{  
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643': '#ebecf0'),
            ml: 2,
            borderRadius: '6px',
            outline: selectedItem?.type === 'column' && selectedItem.id === column._id
              ? '2px solid #4c9aff'
              : '2px solid transparent',
            outlineOffset: '-2px',
            height:'fit-content',
            maxHeight: (theme) =>`calc(${theme.trello.boardcontentheight} - ${theme.spacing(5)})`

          }}>
        
            <Box sx={{
              height: (theme) => theme.trello.columnheaderheight,
              display: 'flex',
              p: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Typography variant="h6" sx= {{
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
                }}>
                ({column?.title})
              </Typography>
              <Box>
                <Tooltip title ="More options">
                  <ExpandMoreIcon 
                    sx={{
                      color: 'text.secondary',
                      cursor: 'pointer',
                    }}
                    id={buttonId}
                    aria-controls={open ? menuId : undefined}
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={handleClick}
                  />
                </Tooltip>
                <Menu
                  id={menuId}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      'aria-labelledby': buttonId
                    },
                  }}
                >
                  <MenuItem>
                    <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Add new card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>< DeleteForeverIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Remove This Column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                    <ListItemText>Archive This Column</ListItemText>
                  </MenuItem>
                </Menu>
                
              </Box>
            </Box>
              {/* Box List card */}
            <ListCards
              cards={orderedCards}
              selectedItem={selectedItem}
              onSelectItem={onSelectItem}
            />

            <Box sx={{
              height: (theme) => theme.trello.columnfooterheight,
              p: 2,
            }}>
              {!openNewCardFrom
                ?<Box sx={{
                  height: '100%',
                  display : 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}

                >
                <Button startIcon={<AddCardIcon />}onClick={toggleOpenNewCardFrom} >Add new card</Button>
                <Tooltip title ="Drag to move">
                  <DragHandleIcon sx={{ cursor: 'pointer' }} />
                </Tooltip>
              </Box>
              : <Box sx={{
                  height: '100%',
                  display : 'flex',
                  alignItems: 'center',
                  gap:1
              }}>
                <TextField
                  label="Enter card title..."
                  type="text"
                  size="small"
                  variant='outlined'
                  autoFocus
                  data-no-dnd="true"
                  value={newCardTitle}
                  onChange={(e) => {
                    setNewCardTitle(e.target.value)
                  }}
                
                  sx={{
                     '& label': { color: 'text.primary' },
                    '& input': {
                      color: (theme) => theme.palette.primary.main,
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : 'white'
                    },
                    '& label.Mui-focused': {
                      color: (theme) => theme.palette.primary.main
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: (theme) => theme.palette.primary.main
                      },
                      '&:hover fieldset': {
                        borderColor: (theme) => theme.palette.primary.main
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: (theme) => theme.palette.primary.main
                      }
                    },
                    '& .MuiOutlinedInput-input': { borderRadius: 1 
                    }
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}> 
                  <Button
                    onClick={addNewCard}
                    variant="contained" color="success" size="small"
                    sx={{
                      boxShadow:'none',
                      boder:'0.5px soild',
                      borderColor: (theme) =>theme.palette.success.main,
                      '&:hover': { bgcolor: (theme) => theme.palette.success.main}
                    }}
                  >Add </Button>
                  <CloseIcon
                    fontSize="small"
                    sx={{ color: (theme) => theme.palette.warning.light,
                      cursor: 'pointer'
                    }}
                    onClick={toggleOpenNewCardFrom }
                    />
                </Box>
              </Box>
              }
                
              
            </Box>
          </Box>
        </div>
  )
}

export default Column
