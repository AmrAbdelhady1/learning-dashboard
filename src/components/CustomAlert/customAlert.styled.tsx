import { Alert, styled } from "@mui/material";
import { theme } from "../../utils/app_theme";

const { palette, breakpoints } = theme;

const customAlertColors = {
  success: palette.primary.main,
  warning: palette.error.main,
  error: palette.error.main,
  info: palette.info.main,
};

export const StyledAlert = styled(Alert)`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-width: 280px;
  min-height: 60px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 400;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  color: ${(props) => customAlertColors[props.severity || "success"]};

  .MuiAlert-icon {
    font-size: inherit;
    margin-right: 1.2em;
    color: inherit;

    svg {
      width: 2em;
      height: 2em;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 15px;
    bottom: 15px;
    left: 0;
    width: 5px;
    background-color: currentColor;
    border-radius: 0px 20px 20px 0px;
  }

  ${breakpoints.up("md")} {
    min-width: 357px;
    min-height: 100px;
    font-size: 20px;
  }
`;
