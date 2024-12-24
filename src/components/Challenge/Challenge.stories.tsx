import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Challenge, ChallengeProps, STATUS } from "./Challenge";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  prompt: "Challenge",
  component: Challenge,
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as ComponentMeta<typeof Challenge>;

const Template: ComponentStory<typeof Challenge> = (args: ChallengeProps) => (
  <Challenge {...args} />
);

export const CDefault = Template.bind({});
CDefault.args = {
  data: { prompt: "Read Me" },
};

export const CNext1 = Template.bind({});
CNext1.args = {
  data: { prompt: "Step 1" },
  status: STATUS.PENDING,
  active: true,
};

export const CDisabled = Template.bind({});
CDisabled.args = {
  data: { prompt: "Disabled" },
  status: STATUS.DISABLED,
};

export const CNext2 = Template.bind({});
CNext2.args = {
  data: { prompt: "Step 2" },
};

export const CNext3 = Template.bind({});
CNext3.args = {
  data: { prompt: "Step 3" },
};
