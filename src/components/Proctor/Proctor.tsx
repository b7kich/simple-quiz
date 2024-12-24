import { FocusEvent, FormEvent } from 'react';
import { useState } from 'react';
import { log } from '../../modules/util'
import './proctor.css';
import correctSoundUrl from './21342__ramjac__quintomovetap1.aiff.mp3'
import retrySoundUrl from './54407__korgms2000b__metronome-tap.mp3'
import successSoundUrl from './615099__mlaudio__magic_game_win_success.mp3'
import completeSoundUrl from './242501__gabrielaraujo__powerupsuccess.wav.mp3'
// import { Question, QuestionHandlers, QuestionData } from '../Question/Question';
import { isTerminal, STATUS } from '../Status/Status';
import { Challenge, ChallengeSubmission, ChallengeProps } from '../Challenge/Challenge';
import { Question, QuestionData, QuestionProps } from '../Question/Question';

  const PASS_MARK = 7/8

  enum SOUNDS {
    CORRECT='correct',
    RETRY='retry',
    SUCCESS='success',
    COMPLETE='complete'
  }

  const sounds = {
    'success': new Audio(successSoundUrl),
    'complete': new Audio(completeSoundUrl),
    'retry': new Audio(retrySoundUrl),
    'correct': new Audio(correctSoundUrl),
  }

  const playSound = (sound:SOUNDS) => {
    try {
      sounds[sound].play()
    } catch (e) {
      log(typeof e)
    }
  }

 /*
  export interface Submission extends Result {
    value: string
  }

*/
export interface ProctorProps { 
  challenges: ChallengeProps[] | QuestionProps[],
  onComplete?: (pass:boolean)=>void
}

/**
 * Challenge / Status Proctor
 */
export const Proctor = ( { challenges, onComplete=undefined}: ProctorProps) => {
  const isQuestion = (challenge:ChallengeProps) => {
   return "undefined" !== typeof (challenge.data as QuestionData).solution
 }
 
 log(challenges)

  const keys = challenges.map( (challenge,index)=> ( ( typeof challenge.data.id !== "undefined")?challenge.data.id:index.toString()))

  const keyIndex =new Map<string,number>(keys.map((key,index)=>([key,index])))

  const [status, setStatus] = useState( challenges.map( (_)=> (_.status)?_.status:STATUS.PENDING) )

  const [active, setActive] = useState(0)  

  const getIndex = (id:string) => {
    const index = keyIndex.get(id)
    if ("undefined" === typeof index) 
      throw new Error("Index not found for " + id);
    return index; 
  }

  const handleActivate = (id:string, _e?: FocusEvent) => {
    const index=getIndex(id)
  
    log("activate" + id) 

    if (_e) log(typeof _e)
   
    if (active === index || isTerminal(status[index]))
      return;
   
    if ( !isTerminal(status[active]) ) {
      setStatusByIndex(active,STATUS.MISSING)
    }
    
    setActive(index)
  }

  const setStatusByIndex = (index:number, newStatus:STATUS) => {
    const draft = [...status]
    draft[index] = newStatus; 
    setStatus(draft)
    return draft
  }

  const findNext = (index:number) => {
    const len = status.length
    let i=1; // skip current
    while (i<len) {
      const nextIndex = (index + i) % len
      if ( isTerminal(status[nextIndex]))
        i++
      else
        return nextIndex
    }
    return undefined
  }

  const complete = (status:STATUS[]) => {
    console.log(status)
    const pass = (status.length < 1 || status.filter( (value) => value===STATUS.COMPLETE).length / status.length >= PASS_MARK) 
    playSound(pass?SOUNDS.SUCCESS:SOUNDS.COMPLETE)
    if (onComplete)
      onComplete(pass)    
  }

  const handleSubmit = (id:string, submission: ChallengeSubmission) => {

    const index=getIndex(id)
    const previousIndexStatus = status[index]

    if (index!==active) {
      log("ERROR: submission for '"+index+"' while active is '"+active+"'!")
    }

    if (isTerminal(previousIndexStatus)) {
      log("ERROR: submission for '"+index+"' while active is '"+active+"'!")
    }

    if (submission.success) {

      const nextIndexStatus = (STATUS.RETRY===previousIndexStatus)?STATUS.RETRIED:STATUS.COMPLETE;

      const currentStatus = setStatusByIndex(index,nextIndexStatus)
      
      const nextIndex=findNext(index)
      if (undefined!== nextIndex) {
        playSound(SOUNDS.CORRECT)
        setActive(nextIndex)
      } else {
        complete(currentStatus)
      } 
    } else {
      setStatusByIndex(index,STATUS.RETRY)
      playSound(SOUNDS.RETRY)
    }
  }

  const childTag = (index:number, challenge: ChallengeProps | QuestionProps ) => {
    if (!isQuestion(challenge)) return (
        <Challenge 
        id = {keys[index]}
        data = {challenge.data}
        active = { index === active}
        status = {status[index]}
        onSubmit={handleSubmit}
        onActivate={handleActivate}
      />
      )
      else return (
        <Question 
        id = {keys[index]}
        data = {challenge.data as QuestionData}
        active = { index === active}
        status = {status[index]}
        onSubmit={handleSubmit}
        onActivate={handleActivate}
      />
      )
  }

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
  }

  const progressBar = () => {
    return (
    <footer>
     <progress max={challenges.length} value={status.filter(_ => isTerminal(_)).length}>{status.filter(_ => isTerminal(_)).length}/{challenges.length}</progress>
    </footer>
    )
  }

  return (
    <>
      <form id="challenges" autoComplete="off" name="challenges" onSubmit={handleFormSubmit}>     
      {
        challenges.map( (challenge, index:number) => (      
          <article key={keys[index]}  className={`question${(index === active)?' active':''}`} >
            {childTag(index, challenge)}
          </article>
        ))
      }
        <menu>
          <li><button type="submit">submit</button></li>
        </menu>
      </form>
      <br />
      {progressBar()}
    </>
  )

  }
