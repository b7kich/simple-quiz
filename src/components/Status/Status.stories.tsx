import { Meta } from "@storybook/react";
import { CSSProperties } from "react";
import { isTerminal, Status, STATUS } from "./Status";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Status",
  component: Status,
} as Meta;

export const ContactSheet = () => (
  <div>
    {" "}
    {[
      STATUS.RETRY,
      STATUS.MISSING,
      STATUS.REVEALED,
      STATUS.COMPLETE,
      STATUS.PENDING,
    ].map((state) => (
      <article
        style={{ "justify-content": "start", display: "flex" } as CSSProperties}
      >
        <aside>
          <Status state={state} />
        </aside>
        <label>
          {state}
          {isTerminal(state)}
        </label>
      </article>
    ))}
  </div>
);
