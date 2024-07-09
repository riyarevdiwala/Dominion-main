import React, { useState } from 'react';
import { BoardFilter } from '../board/board-filter'
import { useDispatch } from 'react-redux';
import { closeDynamicModal, saveBoard, toggleModal } from '../../store/board.actions'
// , toggleStarred
import { loadBoards } from '../../store/board.actions'
import { utilService } from '../../services/util.service'; // Assuming utilService can generate IDs
import { boardService } from '../../services/board.service';

import { RiErrorWarningLine } from 'react-icons/ri'
import { BsBarChart, BsKanban} from 'react-icons/bs'
// import { BsStarFill } from 'react-icons/bs'   , BsStar 
import { FiActivity } from 'react-icons/fi'
import { GrHomeRounded } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RiUserAddLine } from 'react-icons/ri'
import { Tooltip, Dialog, DialogContent, TextField, Button } from '@mui/material';  // Make sure Button is included here



const guest = "https://res.cloudinary.com/du63kkxhl/image/upload/v1675013009/guest_f8d60j.png"

export function BoardHeader ({ board, onSetFilter, isStarredOpen, setIsShowDescription, setIsInviteModalOpen, setBoardType, boardType }) {
    // const isOpen = useSelector(storeState => storeState.boardModule.isBoardModalOpen);
    // const navigate = useNavigate();
    const dispatch = useDispatch(); // Assuming you're using Redux
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const [newMemberName, setNewMemberName] = useState('');
    const [newMemberImgUrl, setNewMemberImgUrl] = useState('');
    const isOpen = useSelector(storeState => storeState.boardModule.isBoardModalOpen)
    const navigate = useNavigate()

    async function onSave (ev) {
        const value = ev.target.innerText
        board.title = value
        try {
            saveBoard(board)
            loadBoards()
        } catch (err) {
            console.log('Failed to save')
        }
    }

    // function onToggleStarred () {
    //     try {
    //         toggleStarred(board, isStarredOpen)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    function toggleIsOpen (type) {
        toggleModal(isOpen)
        navigate(`/board/${board._id}/${type}`)
    }

    function onSetBoardType (type) {
        setBoardType(type)
        closeDynamicModal()
    }
    const handleAddMember = async () => {
        if (!newMemberName.trim()) return;
        const newMember = {
            _id: utilService.makeId(),
            fullname: newMemberName,
            imgUrl: newMemberImgUrl || guest
        };
        await boardService.addMemberToBoard(board._id, newMember);
        setIsAddMemberModalOpen(false); // Close modal after adding
        setNewMemberName(''); // Reset input fields
        setNewMemberImgUrl('');
        dispatch(loadBoards()); // Assuming this updates the local state
    };

    if (!board.members) return <div></div>
    return (
        <header className="board-header">
            <section className='board-title flex align-center space-around'>
                <div className="board-info flex">
                    <Tooltip title="Click to edit" arrow>
                        <blockquote contentEditable onBlur={onSave} suppressContentEditableWarning={true}>
                            <h1>{board.title}</h1>
                        </blockquote>
                    </Tooltip>
                    <Tooltip title="Add Member">
                    <Button onClick={() => setIsAddMemberModalOpen(true)} startIcon={<RiUserAddLine />}>
                        Add Member
                    </Button>
                </Tooltip>
                    <Tooltip title="Show board description" arrow>
                        {/* <div className='info-btn icon' onClick={() => setIsShowDescription(true)}> */}
                            <RiErrorWarningLine />
                        {/* </div> */}
                    </Tooltip>
                    {/* <Tooltip title="Add to favorites" arrow>
                        <div className='star-btn icon ' onClick={onToggleStarred}>
                            {!board.isStarred ? <BsStar className='star' /> : <BsStarFill className="star star-full" />}
                        </div>
                    </Tooltip> */}
                </div>
                <div className='board-tools flex align-center'>
                    <Tooltip title="Show board activity" arrow>
                        <div className='activity' onClick={() => toggleIsOpen('activity')}><FiActivity /></div>
                    </Tooltip>
                    {/* <Tooltip title="Show board members" arrow>
                        <div className='members-last-seen flex' onClick={() => toggleIsOpen('last-viewed')}>
                            <span className='last-seen-title'>Last seen</span>
                            <div className='flex members-imgs'>
                                <img className='member-img1' src={board.members.length ? board.members[0].imgUrl : guest} alt="member" />
                                <img className='member-img2' src={board.members.length > 1 ? board.members[1].imgUrl : guest} alt="member" />
                                <div className='show-more-members'>
                                    <span className='show-more-count'>+2</span>
                                </div>
                            </div>
                        </div>
                    </Tooltip> */}
                    {/* <Tooltip title="Invite members" arrow>
                        <div className="invite" onClick={() => setIsInviteModalOpen(prev => !prev)}>
                            <RiUserAddLine className="invite-icon" />
                            <span className='invite-title'> Invite / 1</span>
                        </div>
                    </Tooltip> */}
                </div>
            </section>

            <Dialog open={isAddMemberModalOpen} onClose={() => setIsAddMemberModalOpen(false)}>
                <DialogContent>
                    <TextField
                        label="Member's Name"
                        variant="outlined"
                        fullWidth
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                        style={{ marginBottom: 8 }}
                    />
                    <TextField
                        label="Image URL (optional)"
                        variant="outlined"
                        fullWidth
                        value={newMemberImgUrl}
                        onChange={(e) => setNewMemberImgUrl(e.target.value)}
                        style={{ marginBottom: 8 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleAddMember}>
                        Add Member
                    </Button>
                </DialogContent>
            </Dialog>
            <div className='board-description flex'>
                {board.description && <p className='board-description-link'>{board.description} <span onClick={() => setIsShowDescription(true)}>See More</span></p>}
            </div>
            <div className='board-display-btns flex' >
                <Tooltip title="Main table" arrow>
                    <div className={`type-btn ${boardType === 'table' ? ' active' : ''}`} onClick={() => onSetBoardType('table')} >
                        <GrHomeRounded className='icon' />
                        <span className='wide' onClick={() => onSetBoardType('table')}>Main Table</span>
                        <span className='mobile'>Main Table</span>
                    </div>
                </Tooltip>
                {/* <Tooltip title="Kanban" arrow>
                    <div className={`type-btn ${boardType === 'kanban' ? ' active' : ''}`} onClick={() => onSetBoardType('kanban')}>
                        <BsKanban />
                        <span className='wide'  >Kanban</span>
                        <span className='mobile' onClick={() => onSetBoardType('kanban')}>Kanban</span>
                    </div>
                </Tooltip> */}
                <Tooltip title="Dashboard" arrow>
                    <div className={`type-btn ${boardType === 'dashboard' ? ' active' : ''}`} onClick={() => onSetBoardType('dashboard')}>
                        <BsBarChart />
                        <span className='wide' >Dashboard</span>
                        <span className='mobile' onClick={() => onSetBoardType('dashboard')}>Dashboard</span>
                    </div>
                </Tooltip>
            </div>
            <div className='board-border'></div>
            {boardType !== 'dashboard' && <BoardFilter onSetFilter={onSetFilter} board={board} />}
        </header >
    )
}
