import { NumericFormat } from "react-number-format";
import { Input } from "@/Components/ui/input";

const InputFormatUang = ({ data, setData, formRefs }:any) => {
  return (
    <NumericFormat
      value={data.harga}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative={false}
      onValueChange={(values) => {
        setData((prevData: any) => ({ ...prevData, harga: values.value }));
      }}
      customInput={Input}
      id="harga"
      name="harga"
      placeholder="Masukkan harga"
      getInputRef={(el : any) => {
        if (formRefs.current) {
          formRefs.current["harga"] = el;
        }
      }}
      required
    />
  );
};

export default InputFormatUang;
