import React from 'react';
import {FILTER_ASM_STATE_OPTIONS} from "../../common/constants";
import {BsCheckLg, FaTimes, FaUndoAlt} from "react-icons/all";
import './AssignmentTable.css';

const MyAssignmentAction = ({row, handleAcceptClick, handleDeclineClick, handleReturnClicked}) => {

    return (
        <div className={'table__actions'}>
            {/* Accept button: only available when assignment is waiting for accept */}
            <BsCheckLg
                color={'#E20C17'}
                className={`action__items ${row.state === FILTER_ASM_STATE_OPTIONS.WAITING_FOR_ACCEPTANCE ? '' : 'disable'}`}
                onClick={
                    row.state === FILTER_ASM_STATE_OPTIONS.WAITING_FOR_ACCEPTANCE ?
                        () => handleAcceptClick(row.id) : undefined
                }
                title={"Accept assignment"}
            />

            {/* Decline button: only available when assignment is waiting for accept */}
            <FaTimes
                color={'#000000'}
                className={`action__items ${row.state === FILTER_ASM_STATE_OPTIONS.WAITING_FOR_ACCEPTANCE ? '' : 'disable'}`}
                onClick={
                    row.state === FILTER_ASM_STATE_OPTIONS.WAITING_FOR_ACCEPTANCE ?
                        () => handleDeclineClick(row.id) : undefined
                }
                title={"Decline assignment"}
            />

            {/* Return button: only available when assignment already accepted */}
            <FaUndoAlt
                color={'#5367E0'}
                className={`action__items ${row.state === FILTER_ASM_STATE_OPTIONS.ACCEPTED ? '' : 'disable'}`}
                onClick={
                    row.state === FILTER_ASM_STATE_OPTIONS.ACCEPTED ? () => handleReturnClicked(row) : undefined
                }
                title={"Return assignment"}
            />
        </div>
    );
};

export default MyAssignmentAction;