import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Card } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  cardSpacing: {
    margin: 10,
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSlider(props) {
  const classes = useStyles();

  const { defaultValue, step, min, max, title } = props;

  return (
    <div className={classes.root}>
      <Card raised className={classes.cardSpacing}> 
        <Typography id="discrete-slider" variant="h6">
          {title}
        </Typography>
        <Slider
          defaultValue={defaultValue}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={step}
          marks
          min={min}
          max={max}
        />
      </Card>
    </div>
  );
}
