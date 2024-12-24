import { QuestionProps } from './components/Question/Question';
import { Subject, SubjectProps } from './components/Subject/Subject'
import { SSeasons } from './components/Subject/Subject.stories'
import { log } from './modules/util'

const fallback = SSeasons.args;

const params = (new URL(window.location.href)).searchParams;

function readParam(name:string, defaultValue=""):string {
  return params.has(name)?params.get(name) as string:defaultValue;
}

function challengeData(solution:string, active:boolean, prompt="_" ) {
  return { prompt: prompt, solution: solution, active: active}
}

function expandChallenges(challenges:QuestionProps[]|Array<string>|Array<Array<string>>):QuestionProps[] {
  return challenges.map((challenge:string|Array<string>|QuestionProps, index:number) => {
    if (typeof challenge === "string") {
      return { id: index.toString(), data: challengeData(challenge, index==0) }
    }
    if (Array.isArray(challenge) && challenge.length==2) {
      return { id: index.toString(), data: challengeData(challenge[1], index==0,challenge[0]) }
    }   
    return challenge as unknown as QuestionProps;
  })
}

function fromJson(defaults:SubjectProps) {
  const jsonb = readParam("jsonb");
  if (jsonb) {
    try {
      log(atob(jsonb))
      const subject = JSON.parse(atob(jsonb)) as SubjectProps;
      subject.challenges = expandChallenges(subject.challenges as QuestionProps[])
      return { ...defaults, ...subject }
    } catch (error) {
      log(error as object)
    }
  }
  return null;
}

function getSubject(): SubjectProps { 
  const subject: SubjectProps = {
    title: readParam("title"),
    intro: readParam("intro"),
    id: readParam("id","1"),
    challenges: []
  }

  try {

    const json = fromJson(subject)
    if (json) return json
    

    const prompts = params.getAll("prompt")
    const solutions = params.getAll("solution")
    if (prompts.length==0 || prompts.length!=solutions.length) 
      return fallback;
      
  
    if (params.has("collection"))
      subject.collection=params.get("collection") as string;

    const challenges = prompts.map((prompt,i) => { return { id: i.toString(), data: { prompt, solution: solutions[i], active: i==0 } } })
    return { ...subject, challenges }

  } catch (error) {
    log(error as object)
  }

  return fallback
}



function Demo() {
  return (
    <Subject {...getSubject()} />
  );
}

export default Demo;
