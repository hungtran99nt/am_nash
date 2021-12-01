import React,  {useState} from 'react';
import {useHistory} from "react-router-dom";
import {FILTER_ASM_STATE_OPTIONS} from "../../common/constants";
import {BsPencilFill, FaRegTimesCircle, FaUndoAlt} from "react-icons/all";


const ManageAssignmentAction = ({cell, row, handleDeleteClicked}) => {
    const history = useHistory();

    const handleEditClicked = (id) => {
        history.push(`edit/assignment/${id}`)
    }
	
    return (
        <div className='table__actions'>
            {/* Edit button: only available when assignment is waiting for accept */}
            <BsPencilFill
                color={'#6F6F6F'}
                className={`action__items ${row.state === FILTER_ASM_STATE_OPTIONS.WAITING_FOR_ACCEPTANCE ? '' : 'disable'}`}
                onClick={
                    row.state !== FILTER_ASM_STATE_OPTIONS.ACCEPTED ?
                        () => handleEditClicked(row.id) : undefined
                }
                title={"Edit assignment"}
            />

            {/* Delete button: only available when assignment is waiting for accept or declined */}
            <FaRegTimesCircle
                color={'#D85667'}
                className={`action__items ${(row.state === FILTER_ASM_STATE_OPTIONS.WAITING_FOR_RETURNING
                || row.state === FILTER_ASM_STATE_OPTIONS.ACCEPTED) ? 'disable' : '' }`}
                onClick={
                    row.state !== FILTER_ASM_STATE_OPTIONS.ACCEPTED
                    && row.state !== FILTER_ASM_STATE_OPTIONS.WAITING_FOR_RETURNING ?
                        () => handleDeleteClicked(row.id) : undefined
                }
                title={"Delete assignment"}
            />

            {/* Return button: only available when assignment already accepted or waiting for returning */}
            <FaUndoAlt
                color={'#5367E0'}
                className={`action__items ${row.state === FILTER_ASM_STATE_OPTIONS.ACCEPTED
                || row.state === FILTER_ASM_STATE_OPTIONS.WAITING_FOR_RETURNING ? '' : 'disable'}`}
                onClick={
                    row.state === FILTER_ASM_STATE_OPTIONS.ACCEPTED
                    || row.state === FILTER_ASM_STATE_OPTIONS.WAITING_FOR_RETURNING ?
                        () => console.log(`Return assignment id: ${row.id}`) : undefined
                }
                title={"Return assignment"}
            />
        </div>
    );
};

export default ManageAssignmentAction;