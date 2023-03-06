import * as React from "react";
import TextField from "@material-ui/core/TextField";

class DatePicker extends React.Component {
  public render() {
    return (
      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true
        }}
      />
    );
  }
}

export default DatePicker;
