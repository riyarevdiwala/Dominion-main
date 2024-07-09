import { useState } from "react"

import {IoTimeOutline}  from 'react-icons/io5'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AiOutlineBold } from 'react-icons/ai'
import { RxUnderline } from 'react-icons/rx'
import { TbAlignRight ,TbAlignCenter,TbAlignLeft } from 'react-icons/tb'

import { CommentMenuModal } from "../modal/modal-comment"
import { utilService } from "../../services/util.service"

const guest = "https://res.cloudinary.com/du63kkxhl/image/upload/v1675013009/guest_f8d60j.png"

export function CommentPreview({onRemoveComment, comment, taskId, onEditComment}) {
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editComment, setEditComment] = useState({...comment})
    function handleChange({ target }) {
        let { value, name: field } = target
        setEditComment((prevComment) => ({ ...prevComment, [field]: value }))
    }

    function onCancelEdit() {
        setEditComment({...comment})
        setIsEditOpen(false)
    }

    function onSaveEdit() {
        onEditComment(editComment, taskId)
        setIsEditOpen(false)
    }

    function onChangeTextStyle(ev, styleKey, align) {
        ev.preventDefault()
        const style = {...editComment.style}
        switch (styleKey) {
            case 'fontStyle':  
                style.fontStyle = style.fontStyle === 'normal' ? 'italic' : 'normal'
                break;
            case 'fontWeight': 
                style.fontWeight = style[styleKey] === 'normal' ? 'bold' : 'normal'
                break;
            case 'textDecoration': 
                style[styleKey] = style[styleKey] === 'none' ? 'underline' : 'none'
                break;
            case 'textAlign': 
                style[styleKey] = align
                break;
            default: return
        }
        setEditComment((prevComment) => ({ ...prevComment, style }))
    }

    return (
        <section className="comment-preview">
            <div className="header-comment flex space-between">
                <div className="left flex align-center">
                    <img src={comment.byMember?.imgUrl || guest} alt="" />
                    <span>{comment.byMember.fullname}</span>
                </div>
                <div className="right flex align-center">
                    <div className="time flex align-center">
                        <IoTimeOutline />
                        <span>{utilService.calculateTime(comment.archivedAt)}</span>
                    </div>
                    <div className={`menu-icon-container ${isMenuModalOpen ? ' active' : ''}`}>
                        <BiDotsHorizontalRounded onClick={() => setIsMenuModalOpen(!isMenuModalOpen)}/>
                        {isMenuModalOpen && <CommentMenuModal onRemoveComment={onRemoveComment} commentId={comment.id} onOpenEdit={setIsEditOpen} setIsMenuModalOpen={setIsMenuModalOpen} taskId={taskId}/>}
                    </div>
                </div>
            </div>
            {!isEditOpen && <p style={comment.style}>{comment.txt}</p>}
            {isEditOpen && <form className="input-container">
                        <div className="style-txt">
                            <span onMouseDown={(ev) => onChangeTextStyle(ev, 'fontWeight')}><AiOutlineBold /></span>
                            <span onMouseDown={(ev) => onChangeTextStyle(ev, 'textDecoration')}><RxUnderline /></span>
                            <span onMouseDown={(ev) => onChangeTextStyle(ev, 'fontStyle')}>/</span>
                            <span onMouseDown={(ev) => onChangeTextStyle(ev, 'textAlign', 'Left')}><TbAlignLeft /></span>
                            <span onMouseDown={(ev) => onChangeTextStyle(ev, 'textAlign', 'Center')}><TbAlignCenter /></span>
                            <span onMouseDown={(ev) => onChangeTextStyle(ev, 'textAlign', 'Right')}><TbAlignRight /></span>
                        </div>
                        <textarea
                        name="txt"
                        style={editComment.style}
                        value={editComment.txt}
                        onChange={handleChange}></textarea>
                    </form>}
                    {isEditOpen && <div className="button-container">
                        <button className="save" onMouseDown={onSaveEdit}>Save</button>
                        <button className="cancel" onMouseDown={onCancelEdit}>Cancel</button>
                    </div>}
        </section>
    )
}