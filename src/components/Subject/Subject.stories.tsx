import { Story, Meta } from '@storybook/react';
import { Subject } from './Subject';
import { QDefault, QColon, QEllipsis, QNumber, QMath, QFill, QFloat, QLong } from '../Question/Question.stories';
import { QuestionProps } from '../Question/Question';
import { ChallengeProps } from '../Challenge/Challenge';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Subject',
  component: Subject,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as Meta<typeof Subject>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<typeof Subject> = (args) => <Subject {...args} />;


export const SDefault = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SDefault.args = {
  id: "1",
  title: "Sample Questions",
  intro: `
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <h6>Heading 6</h6>
  
  ![an SVG](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgODAwIDQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGlkPSJ0YXJnZXQiIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjUwIiBjbGFzcz0iZHJvcHpvbmUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2EzNSIgc3Ryb2tlLXdpZHRoPSI1IiAvPjwvc3ZnPg==)

  Shows various <b>example</b> questions. <br /> <code>abcdefghijklmnopqrstuvwxyz</code>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

  - [A link](https://www.xznas8reknadyere.ppmedeairhe/)
  - [A visited link](https://www.google.com/)
  `,
  challenges: [QColon.args, QEllipsis.args, QNumber.args, QMath.args, QFill.args, QFloat.args, QLong.args] as any as QuestionProps[]
};


const addSample = (digits=2,overflow=false) => {
  const a=[] as number[];
  const b=[] as number[];
  for (let i=0; i<digits; i++) {
    const c=Math.floor(Math.random()*10)
    if (a.length>0 || i+1===digits || c) 
      a.push(c);
    const d = Math.floor(Math.random()*(overflow?10:(9-c)))
    if (b.length>0 || i+1===digits || d)
      b.push(d);
  }

  return { 
    "data" : {
      "prompt": a.join("") + " + " + b.join("") + " =",
      "solution": (Number(a.join(""))+Number(b.join(""))).toString()
   }
  }
}

const mathQuestions = (n:number) => Array(n).fill(0).map( (_v,i) => ({ id: i.toString(), ...addSample(2)} as any as QuestionProps) )

export const SMath = Template.bind({});
SMath.args = {
  id: "2",
  title: "Adding two digits (without regrouping)",
  intro: `<a href="https://www.youtube.com/watch?v=CRLRLp0Z0s4">https://www.youtube.com/watch?v=CRLRLp0Z0s4</a>`,
  challenges: mathQuestions(7)
}

export const SMath2 = Template.bind({});
SMath2.args = {
  id: "2",
  title: "Adding two digits (without regrouping)",
  intro: `
<iframe src="https://www.youtube-nocookie.com/embed/CRLRLp0Z0s4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
`,
  challenges: mathQuestions(2)
}

export const SNotes = Template.bind({});
SNotes.args = {
  id: "3",
  title: "The musical scale goes",
  intro: `
  ## practice 
  [![practise the scale](https://img.youtube.com/vi/3eT2NoTYwNA/0.jpg)](https://www.youtube.com/watch?v=3eT2NoTYwNA)
  `,
  challenges: ([{'id':1, 'data': {'prompt':'do'}}] as any as ChallengeProps[]).concat('re,mi,fa,sol,la,si'.split(',').map((v,i) => { return {'id':i+1,'data':{'prompt':'_','solution':v}} as any as ChallengeProps }))
}

export const SSeasons = Template.bind({});
SSeasons.args = {
  id: "4",
  title: "The Seasons",
  intro: `
<p>Name the seasons in appearance during the year.
</p>
<iframe src="https://www.youtube-nocookie.com/embed/NavWWM2iTEw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  `,
  challenges: 'winter,spring,summer,fall'.split(',').map((v,i) => { return {'id':i,'data':{'prompt':'_','solution':v}} as any as QuestionProps })
}


