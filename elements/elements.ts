export const buttonCommonProps = { type: "button", style: "primary" };
export const buttonHelp = {
  ...buttonCommonProps,
  text: { type: "plain_text", text: "Hjälp? :information_desk_person:" },
  action_id: "help_request",
};

export const buttonCheerMeUp = {
  ...buttonCommonProps,
  text: { type: "plain_text", text: "Pigga upp mig! :smile:" },
  action_id: "fun_request",
};

export const buttonZen = {
  ...buttonCommonProps,
  text: { type: "plain_text", text: "Zen.. :zap:" },
  action_id: "zen_request",
};

export const buttonWeek = {
  ...buttonCommonProps,
  text: { type: "plain_text", text: "Vecka? :spiral_calendar_pad:" },
  action_id: "week_request",
};
