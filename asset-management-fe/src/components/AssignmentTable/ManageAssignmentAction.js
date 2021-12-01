import React,  {useState} from 'react';
import {useHistory} from "react-router-dom";
import {FILTER_ASM_STATE_OPTIONS} from "../../common/constants";
import {BsPencilFill, FaRegTimesCircle, FaUndoAlt} from "react-icons/all";
import axios from 'axios';
import { API_URL } from "../../common/constants";
import AssignmentDeleteConfirmation from './AssignmentModal/AssignmentDeleteConfirmation'

const ManageAssignmentAction = ({cell, row, assignments}) => {
    const history = useHistory();

    const handleEditClicked = (id) => {
        history.push(`edit/assignment/${id}`)
    }
   
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [idDelete, setIdDelete] = useState(null);
	const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);
	const handleShowDeleteConfirm = () => setShowDeleteConfirm(true);

    const handleDeleteClicked = (id) => {
		setIdDelete(id);
		axios.get(`${API_URL}/admin/assignments/${id}/valid`).then((response) => {
			if (response.data === true) {
				handleShowDeleteConfirm();
			}
			
		}).catch(err => {alert(`Error with check valid to delete asset ${err}`)})
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
                        () => {handleDeleteClicked(row.id)} : undefined
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
            {
				showDeleteConfirm &&
				<AssignmentDeleteConfirmation
					showDeleteConfirm={showDeleteConfirm}
					handleCloseDeleteConfirm={handleCloseDeleteConfirm}
					assignments={assignments}
					idDelete={idDelete}
				/>
			}
        </div>
    );
};

export default ManageAssignmentAction;