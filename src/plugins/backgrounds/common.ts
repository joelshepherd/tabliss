import { defineMessages } from "react-intl";

const messages = defineMessages({
    reloadImgHint: {
        id: "dashboard.reloadImgHint",
        defaultMessage: "Reload background",
        description: "Reload background image",
    },
});

const reloadIconName = "refresh-cw";

export { messages, reloadIconName };
