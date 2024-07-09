import { useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { removeBoard, saveBoard, loadBoard, setDynamicModalObj } from "../../store/board.actions"
import { boardService } from "../../services/board.service"

import { BiDotsHorizontalRounded } from "react-icons/bi"

export function BoardPreview({ board }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const { boardId } = useParams()
    const navigate = useNavigate()
    const elBoardPreview = useRef()
    const dynamicModalObj = useSelector(storeState => storeState.boardModule.dynamicModalObj)

    function onChangeBoard(boardId) {
        navigate(`/board/${boardId}`)
        loadBoard(boardId)
    }

    async function onRemove(boardId) {
        try {
            await removeBoard(boardId)
            if(!boards.length) await saveBoard(boardService.getEmptyBoard())
            onChangeBoard(boards[0]._id)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function onDuplicate(board) {
        try {
            const DuplicateBoard = structuredClone(board)
            DuplicateBoard._id = null
            saveBoard(DuplicateBoard)
        } catch (err) {
            console.log('err:', err)
        }
    }

    function onToggleMemberFilterModal() {
        const isOpen = dynamicModalObj?.type === 'board-menu' ? !dynamicModalObj.isOpen : true
        const { x, y } = elBoardPreview.current.getClientRects()[0]
        setDynamicModalObj({ isOpen, pos: { x: (x + 190), y: (y + 35) }, type: 'board-menu', onRemove: onRemove, onDuplicate: onDuplicate})
    }

    return (
        <section ref={elBoardPreview} onClick={() => onChangeBoard(board._id)} className={`board-preview flex space-between align-center ${board._id === boardId ? ' active' : ''}`}>
            <div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fill="currentColor" />
                </svg>
                <span>{board.title}</span>
            </div>
            <div className='menu-icon-container'>
                <BiDotsHorizontalRounded className="icon" onClick={onToggleMemberFilterModal}/>
            </div>
        </section>
    )
}