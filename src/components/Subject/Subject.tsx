import './subject.css'
import { Proctor } from '../Proctor/Proctor'
import { QuestionProps } from '../Question/Question'
import { useRef } from 'react';
import { ChallengeProps } from '../Challenge/Challenge';
import { html } from '../../modules/util';

export interface SubjectProps {

  /**
   * Subject name or title
   */
  title: string;

  /**
   * Markdown for everything you need to know to answer the questions. 
   */
  intro: string;

  challenges: (QuestionProps|ChallengeProps)[]

  id?: string;

  collection?: string;

  onContinue?:(pass:boolean, index?:string, collection?:string )=>void,

}

/**
 * Subject / Exercise Prompt and Text Answer Input.
 * 
 */
export const Subject = ({
  title,
  intro,
  challenges,
  id=undefined,
  collection=undefined,
  onContinue=undefined,
}: SubjectProps) => {

  const details=useRef<HTMLDetailsElement>(null)

  const handleComplete = (pass:boolean) => {
    if (onContinue) 
      onContinue(pass,id,collection)
  }

  return (
    <main id="subject">
      <h2>{title}</h2>
      {intro && 
       <details className="intro" ref={details}>
        <div className='intro'
        dangerouslySetInnerHTML={{
          __html: html(intro)
        }}>
        </div>
      </details>
      }
      <section className="exercise" >   
        <Proctor challenges={challenges} onComplete={handleComplete} />
      </section>
    </main>
  );
};
