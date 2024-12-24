import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Question, QuestionProps } from "./Question";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Question",
  component: Question,
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as ComponentMeta<typeof Question>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Question> = (args: QuestionProps) => (
  <Question {...args} />
);

export const QDefault = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
QDefault.args = {
  data: {
    prompt: "How many inches are in a foot?",
    solution: "12",
  },
};

export const QColon = Template.bind({});
QColon.args = {
  data: {
    prompt: "Name the longest bone in the human body:",
    solution: "femur",
  },
};

export const QFill = Template.bind({});
QFill.args = {
  data: {
    prompt: "The plural of ____ is mice",
    solution: "mouse",
  },
};

export const QEllipsis = Template.bind({});
QEllipsis.args = {
  data: {
    prompt: "The sun rises in the ...",
    solution: "east",
  },
};

export const QNumber = Template.bind({});
QNumber.args = {
  data: {
    prompt: "How many inches are in a foot?",
    solution: "12",
  },
};

export const QMath = Template.bind({});
QMath.args = {
  data: {
    prompt: "3 + 5 =",
    solution: "8",
  },
};

export const QFloat = Template.bind({});
QFloat.args = {
  data: {
    prompt: "How many cm are in an inch (1 decimal)?",
    solution: "2.5",
  },
};

export const QLong = Template.bind({});
QLong.args = {
  data: {
    prompt: "The alphabet goes",
    solution: "abcdefghijklmnopqrstuvwxyz",
  },
};
