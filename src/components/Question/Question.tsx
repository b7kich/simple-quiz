import './question.css';
import { log } from '../../modules/util'
import { KeyboardEvent, FocusEvent, ChangeEvent } from 'react';
import { useState, useRef, useEffect } from 'react';
import { ChallengeData, ChallengeProps } from '../Challenge/Challenge'
import { isTerminal, Status, STATUS } from '../Status/Status'

export interface QuestionData extends ChallengeData {
    solution: string
    id?:string
    disableInlining?:boolean
}

export interface QuestionProps extends ChallengeProps {
    data: QuestionData,
}

/**
 * Question / Exercise Prompt and Text Answer Input.
 */
export const Question = ({ id, data, active, status=STATUS.PENDING, onSubmit = undefined, onActivate = undefined }: QuestionProps) => {

    const [lastAnswer, setAnswer] = useState("")

    const elementRef = useRef<HTMLInputElement>(null);

    const unChanged = (input:string) => {
      return input===lastAnswer
    }

    const transform = (answer: string): string => {
      const skipwords = /^\s*(a|an|the)\s+/
      let transformed = answer.toLowerCase()
      if (data.solution.length>3) transformed=transformed.replace(skipwords, "")
      return transformed.trim()
    }
  
    const validate = (transformedAnswer: string, solution: string) => {
      return transformedAnswer === solution.toLocaleLowerCase()
    }
  
    const isCorrect = (answer: string): boolean => {
      return validate(transform(answer), data.solution)
    }
  
    const checkSubmission = () => {
 
        if (isTerminal(status))
            return;

        const input = elementRef.current?.value;

        if (!input || unChanged(input))
          return;
  
        log("answer: " + input)
        setAnswer(input)

        const result = {
            success: isCorrect(input)
        }

        if (onSubmit && "undefined" !==typeof id )
            onSubmit(id,result)

    }

    const isSubmit = (e:KeyboardEvent) => {
      const ENTER_KEY = 13
      const ENTER_NAME = "Enter"
      const TAB_KEY = 9
      const TAB_NAME = "Tab"
      const code = (typeof e.code !== 'undefined')?e.code:e.keyCode;
      const key = e.key
      log("enter?")
      log(code)
      return code === ENTER_KEY || key === ENTER_NAME || code === TAB_KEY || key === TAB_NAME
    }
  
    const handleKey = (e: KeyboardEvent) => {
      log(e.type)
      if (!isSubmit(e))
        return;
      log("Enter")
      e.preventDefault()
      checkSubmission()
    }
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>|Event) => {
      log(e.type)
      checkSubmission()
    }
  
    /**
     * ignore inputEvents https://github.com/facebook/react/issues/2955
     */ 
    const handleReactChange = (e: ChangeEvent) => {
      log("reactChange")
      log(e.nativeEvent.type)
      if ("change" === e.nativeEvent.type)
        handleChange(e.nativeEvent)
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
    const inputMode = (answer: string) => {
      if (!isNaN(Number(answer)))
        return "numeric";
      return "text";
    }
  
    const inline = (prompt: string) => {
      if (!data.disableInlining) {
        const pieces = prompt.split(/(?:^|\s)_+(?:\s+|$)/)
        if (2 === pieces.length)
          return pieces
      }
      return [prompt, ""]
    
    }
  
    const [before, after] = inline(data.prompt)

    const pad = (prompt:string) => {
      if (prompt.length > 0 ) 
        return <span>&nbsp;</span>
    }
  
    return (
        <>
          <label>{before}{pad(before)}
            <input 
              className={data.solution.length < 4 ? "short" : (data.solution.length < 15? "long" : "wide")}
              ref={elementRef}
              type="text"
              inputMode={inputMode(data.solution)}
              enterKeyHint="next"
              spellCheck="false"
              autoCorrect="off"
              autoComplete='none'
              writingsuggestions="false"
              disabled={isTerminal(status)}
              onChange={handleReactChange}
              onKeyUp={handleKey}
              onFocus={handleFocus}
              onBlur={handleBlur}
              tabIndex={(isTerminal(status)) ? -1 : 0}
            />
            {pad(after)}
            {after}
          </label>
          {showActiveStatus()}
        </>
    );
}
