import React from 'react';
import {useHistory} from "react-router-dom";
import {FILTER_ASM_STATE_OPTIONS} from "../../common/constants";
import {BsPencilFill, FaRegTimesCircle, FaUndoAlt} from "react-icons/all";

const ManageAssignmentAction = ({cell, row}) => {
    const history = useHistory();

    const handleEditClicked = (id) => {
        history.push(`edit/assignment/${id}`)
    }

    return (
        <div className={`table__actions ${row.state === FILTER_ASM_STATE_OPTIONS.ACCEPTED ? 'disable' : ''}`}>
            <BsPencilFill
                color={'#6F6F6F'}
                className="action__items"
                onClick={
                    row.state !== FILTER_ASM_STATE_OPTIONS.ACCEPTED ?
                        () => handleEditClicked(row.id) : undefined
                }
                title={"Edit assignment"}
            />

            <FaRegTimesCircle
                color={'#D85667'}
                className="action__items"
                onClick={
                    row.state !== FILTER_ASM_STATE_OPTIONS.ACCEPTED ?
                        () => console.log(`Delete assignment id: ${row.id}`) : undefined
                }
                title={"Delete assignment"}
            />

            <FaUndoAlt
                color={'#5367E0'}
                className="action__items"
                onClick={
                    row.state !== FILTER_ASM_STATE_OPTIONS.ACCEPTED ?
                        () => console.log(`Return assignment id: ${row.id}`) : undefined
                }
                title={"Return assignment"}
            />
        </div>
    );
};

export default ManageAssignmentAction;