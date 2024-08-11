import { marks } from "@/lib/constants";
import {
  Slider,
  SliderThumb,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";

const minScore = marks[0].value;
const maxScore = marks[marks.length - 1].value;
const totalSteps = marks.length;
const stepSize = 20;

const getColor = (value: number) => {
  if (value <= 660) return "red";
  if (value <= 700) return "orange";
  return "green";
};

const createGradient = () => {
  let gradient = "";
  for (let i = 0; i < totalSteps; i++) {
    const score = minScore + i * stepSize;
    const percentage = (i / (totalSteps - 1)) * 100;
    gradient += `${getColor(score)} ${percentage}%`;
    if (i < totalSteps - 1) {
      gradient += ", ";
    }
  }
  return `linear-gradient(to right, ${gradient})`;
};

const SliderComponent = styled(Slider)(({ theme }) => ({
  color: "#4ca751",
  height: 7,
  padding: "9px 0",
  "& .MuiSlider-markLabel": {
    fontSize: "0.7rem",
    top: 24,
    color: "#425243",
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-mark": {
    width: "0.5px",
    height: "7px",
    backgroundColor: "#f3f4f6",
    transform: "translate(0px, -50%)",
  },
  "& .MuiSlider-track": {
    height: 7,
    background: "transparent",
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 7,
    background: createGradient(),
    borderRadius: 0,
  },
}));

interface ThumbComponentProps extends React.HTMLAttributes<unknown> {}

function ThumbComponent(props: ThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

export default function CustomizedSlider({
  values,
  handleOptionsChange,
}: {
  values: number[];
  handleOptionsChange: (input: any) => void;
}) {
  const [value, setValue] = useState<number[]>([]);
  useEffect(() => {
    setValue([values[0], values[1]]);
  }, [values]);
  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - stepSize), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + stepSize)]);
    }
  };

  return (
    <div className="relative flex justify-center items-center">
      <SliderComponent
        step={stepSize}
        min={minScore}
        max={maxScore}
        disableSwap
        slots={{ thumb: ThumbComponent }}
        onChange={handleChange}
        onChangeCommitted={() => {
          handleOptionsChange({
            minfico: value[0],
            maxfico: value[1],
          });
        }}
        onChangeCapture={() => {
          console.log("onChangeCapture");
        }}
        value={value}
        marks={marks}
        valueLabelDisplay="auto"
      />
      <div className="text-black absolute top-[28px] ">
        <Typography
          variant="body2"
          color="textSecondary"
          className="text-textColor"
        >
          {value[0]}-{value[1]}
        </Typography>
      </div>
    </div>
  );
}
