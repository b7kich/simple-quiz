import './status.css'

export interface StatusProps {
    state:STATUS
}

export const enum STATUS {
    MISSING = "missing",
    RETRY = "retry",
    RETRIED = "retried",
    REVEALED = "revealed",
    COMPLETE = "complete",
    PENDING = "pending",
    DISABLED = "disabled"
}

export const TERMINALS=["complete","revealed","disabled","retried"]

export const isTerminal = (state:STATUS) => (
    TERMINALS.includes(state)
)

export const message = {
    "missing": ["Try it!","replay_circle_filled"],
    "retry": ["Try again!","replay_circle_filled"],
    "revealed": ["Skipped!","preview"],
    "complete": ["Success!","task_alt"],
    "retried": ["Correct!","task_alt"],
//    "retried": ["Correct!","published_with_changes"],
    "pending": ["Pending!","check_box_outline_blank"],
    "disabled": ["Disabled",""]
}

export const Status = ({state} : StatusProps) => {
 const [title,icon]=message[state]
 
 return (
    <aside className={`material-icons ${state} ${isTerminal(state)?"terminal":""}`} title={title}>{icon}</aside>
    )
}



