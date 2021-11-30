import React from 'react';
import {FILTER_ASM_STATE_OPTIONS} from "../../common/constants";
import {BsCheckLg, FaTimes, FaUndoAlt} from "react-icons/all";
import {useHistory} from "react-router-dom";
import './AssignmentTable.css';

const MyAssignmentAction = ({cell, row}) => {
    const history = useHistory();

    return (
        <div className={'table__actions'}>
            {/* Accept button: only available when assignment is waiting for accept */}
            <BsCheckLg
                color={'#E20C17'}
                className={`action__items ${row.state === FILTER_ASM_STATE_OPTIONS.WAITING_FOR_ACCEPTANCE ? '' : 'disable'}`}
                onClick={
                    row.state !== FILTER_ASM_STATE_OPTIONS.WAITING_FOR_ACCEPTANCE ?
                        () => console.log(`Accept assignment id: ${row.id}`) : undefined
                }
                title={"Accept assignment"}
            />

            {/* Decline button: only available when assignment is waiting for accept */}
            <FaTimes
                color={'#000000'}
                className={`action__items ${row.state === FILTER_ASM_STATE_OPTIONS.WAITING_FOR_ACCEPTANCE ? '' : 'disable'}`}
                onClick={
                    row.state === FILTER_ASM_STATE_OPTIONS.WAITING_FOR_ACCEPTANCE ?
                        () => console.log(`Decline assignment id: ${row.id}`) : undefined
                }
                title={"Decline assignment"}
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

export default MyAssignmentAction;