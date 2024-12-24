import './challenge.css';
import { log } from '../../modules/util'
import { FocusEvent } from 'react';
import { useEffect, useRef } from 'react';
import { isTerminal, Status, STATUS } from '../Status/Status'
export { STATUS } from '../Status/Status'

export interface ChallengeSubmission {
    success:boolean
}

export interface ChallengeData {
    prompt: string
    id?:string
}

export interface ChallengeHandler {

    onActivate?: (id: string, e?: FocusEvent) => void

    onSubmit?: (id: string, submission: ChallengeSubmission) => void
}

export interface ChallengeProps extends ChallengeHandler {
    id: string

    active?: boolean

    data: ChallengeData,
 
    status?: STATUS

}

export const Challenge = ({ id, data, active=false, status=STATUS.PENDING, onSubmit = undefined, onActivate = undefined }: ChallengeProps) => {
    
    const elementRef = useRef<HTMLLabelElement>(null);

    const checkSubmission = () => {
 
        if (isTerminal(status))
            return;

        const result = {
            success: true
        }


        if (onSubmit && "undefined" !==typeof id )
            onSubmit(id,result)

    }

    const handleFocus = (e: FocusEvent) => {
        log(e.nativeEvent.type, elementRef.current)
        if (isTerminal(status))
            return;

        if (onActivate && "undefined" !==typeof id)
            onActivate(id,e)
    }

    const handleBlur = (e: FocusEvent) => {
        log(e.nativeEvent.type, elementRef.current)
        checkSubmission()
    }

    useEffect(() => {
        
        if (isTerminal(status)) {
            if (elementRef.current)
                elementRef.current.inert=true
        } else if (active) {
            elementRef.current?.focus()
        }

    }, [active, status]);

    const showActiveStatus = () => {
        if (!isTerminal(status) && active) 
            return <button type="button" tabIndex={-1} className="material-icons" onClick={checkSubmission} title="Submit">keyboard_return</button>
        else 
           return <Status state={status} />

    }

    return (
        <>
        <label tabIndex={(isTerminal(status)) ? -1 : 0} onFocus={handleFocus} onBlur={handleBlur} ref={elementRef}>{data.prompt}
        </label>
        {showActiveStatus()}
        </>
    );
}



