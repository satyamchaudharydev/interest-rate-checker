import { marks } from "@/lib/constants";
import { Box, Slider, SliderThumb, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";

const SliderComponent = styled(Slider)(({ theme }) => ({
  color: "#3a8589",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-markLabel": {
    fontSize: "0.7rem",
    top: 24,
    color: "#3a85899e",
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
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
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
const minDistance = 25;

const scale = (value: number) => {
  if (value === undefined) {
    return 0;
  }
  const previousMarkIndex = Math.floor(value / 25);
  const previousMark = marks[previousMarkIndex];
  const remainder = value % 25;
  if (remainder === 0) {
    return previousMark.scaledValue;
  }
  const nextMark = marks[previousMarkIndex + 1];
  const increment = (nextMark.scaledValue - previousMark.scaledValue) / 25;
  return remainder * increment + previousMark.scaledValue;
};
const unscale = (value: number) => {
  const index = marks.findIndex((mark) => mark.scaledValue > value) - 1;
  const lower = marks[index];
  const upper = marks[index + 1];
  const ratio =
    (value - lower.scaledValue) / (upper.scaledValue - lower.scaledValue);
  return lower.value + ratio * 25;
};
export default function CustomizedSlider({
  values,
  handleOptionsChange,
}: {
  values: number[];
  handleOptionsChange: (input: any) => void;
}) {
  const [value, setValue] = useState<number[]>([]);
  useEffect(() => {
    setValue([unscale(values[0]), unscale(values[1])]);
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
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <div className="relative flex justify-center items-center">
      <SliderComponent
        aria-label="Restricted values"
        step={25}
        max={300}
        slots={{ thumb: ThumbComponent }}
        onChange={handleChange}
        onChangeCommitted={() => {
          handleOptionsChange({
            minfico: scale(value[0]),
            maxfico: scale(value[1]),
          });
        }}
        disableSwap
        value={value}
        scale={scale}
        marks={marks}
        valueLabelDisplay="auto"
        getAriaLabel={(index: number) =>
          index === 0 ? "Minimum price" : "Maximum price"
        }
      />
      <div className="text-black absolute top-[25px] ">
        <Typography
          variant="body2"
          color="textSecondary"
          className="text-[#3a8589]"
        >
          {scale(value[0])}-{scale(value[1])}
        </Typography>
      </div>
    </div>
  );
}
