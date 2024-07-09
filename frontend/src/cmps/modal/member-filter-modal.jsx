import { useSelector } from "react-redux";
import { CgClose } from 'react-icons/cg'
import { setDynamicModalObj } from '../../store/board.actions'

export function MemberFilterModal({dynamicModalObj}) {
    const board = useSelector(storeState => storeState.boardModule.filteredBoard)
    
    function onFilterBoard(memberId) {
        dynamicModalObj.filterBy.memberId = memberId
        dynamicModalObj.setFilterBy({...dynamicModalObj.filterBy})
    }

    return (
        <section className="filter-member-modal flex column">
            <CgClose className="close-btn" onClick={() => setDynamicModalObj({ isOpen: false})} />
            <h2>Quick person filter</h2>
            <div className="secondary-title">Filter items and subitems by person</div>
            <ul>
                {
                    board.members.map(member => {
                        return <li key={member._id} className={dynamicModalObj.filterBy.memberId === member._id ? 'active' : ''}>
                            <img onClick={() => onFilterBoard(member._id)} src={member.imgUrl} alt="" />
                        </li>
                    })
                }
            </ul>
    </section>
    )
}