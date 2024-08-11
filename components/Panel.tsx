
import {
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { RateOptions } from "@/interfaces/types";
import CustomizedSlider from "./ui/RangeSlider";
import { CustomToggleButtonGroup } from "./ui/CustomToggleButton";
import { loanTerm, rateType, statesData, loanTypeData } from "@/lib/constants";

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});

export const Panel = ({
  rateOptions,
  handlePanelChange,
  handleOptionsChange,
}: {
  rateOptions: RateOptions;
  handlePanelChange: (newValue: string | number, field: keyof RateOptions) => void;
  handleOptionsChange: (input: any) => void;
}) => {
  return (
    <div
      className="h-full bg-white w-full border p-7 px-4"
      style={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h2 className="text-textColor  text-left text-[1rem] font-[600]">
        Explore rate options
      </h2>
      <div className="mt-[2rem] flex flex-col gap-4 p-4 rounded-xl bg-[#FAFBFC]">
        <div className="flex flex-col">
          <label className="text-grayColor font-[500] !text-[12px] w-fit mb-2">
            Credit Score Range
          </label>
          <div className="mx-2">
            <CustomizedSlider
              handleOptionsChange={handleOptionsChange}
              values={[rateOptions.minfico, rateOptions.maxfico]}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-grayColor font-[500] !text-[12px] w-fit mb-2">
            Choose Your State{" "}
          </label>
          <Select
            className="h-10"
            value={rateOptions.state}
            onChange={(e) => handlePanelChange(e.target.value, "state")}
          >
            {statesData.map((state) => (
              <MenuItem key={state.value} value={state.value}>
                {state.label}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <label className="text-grayColor font-[500] !text-[12px] w-fit mb-2">
            Enter House Price{" "}
          </label>
          <CssTextField
            id="outlined-basic"
            type="number"
            InputProps={{
              startAdornment: (
               <>
                <span style={{marginRight: 20}}>$</span>
               </>
              ),
            }}
            value={rateOptions.price}
            size="small"
            onChange={(e) => handlePanelChange(e.target.value, "price")}
            className="!p-0"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-grayColor font-[500] !text-[12px] w-fit mb-2">
            Rate Type
          </label>
          
          <CustomToggleButtonGroup
            options={rateType}
            value={rateOptions.rateStructure}
            onChange={(value) => {
              handlePanelChange(value, "rateStructure");
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-grayColor font-[500] !text-[12px] w-fit mb-2">
            Loan Term
          </label>
          <CustomToggleButtonGroup
            options={loanTerm}
            value={rateOptions.loanTerm}
            onChange={(value) => {
              handlePanelChange(value, "loanTerm");
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-grayColor font-[500] !text-[12px] w-fit mb-2">
            Loan Type
          </label>
          <CustomToggleButtonGroup
            options={loanTypeData}
            value={rateOptions.loanType}
            onChange={(value) => {
              handlePanelChange(value, "loanType");
            }}
          />
        </div>
      </div>
    </div>
  );
};


