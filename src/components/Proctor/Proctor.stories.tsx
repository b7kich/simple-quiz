import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  CDefault,
  CNext1,
  CDisabled,
  CNext2,
  CNext3,
} from "../Challenge/Challenge.stories";
import {
  QDefault,
  QColon,
  QEllipsis,
  QMath,
  QFill,
  QFloat,
  QLong,
} from "../Question/Question.stories";
import { ChallengeProps } from "../Challenge/Challenge";
import { Proctor } from "./Proctor";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Proctor",
  component: Proctor,
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as ComponentMeta<typeof Proctor>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Proctor> = (args) => (
  <Proctor {...args} />
);

export const PChallenge = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PChallenge.args = {
  challenges: [
    CDefault.args,
    CNext1.args,
    CDisabled.args,
    CNext2.args,
    CNext3.args,
  ] as ChallengeProps[],
};

export const PQuestion = Template.bind({});
PQuestion.args = {
  challenges: [
    QDefault.args,
    QColon.args,
    QEllipsis.args,
    QMath.args,
    QFill.args,
    QFloat.args,
    QLong.args,
  ] as ChallengeProps[],
};
