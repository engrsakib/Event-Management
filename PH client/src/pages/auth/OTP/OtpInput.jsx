import React, { useRef, } from "react";

const OtpInput = ({setOtp}) => {
  const navigationInputs = useRef([]);
    
  const length = 6;

  const onChange = (value) => {
    setOtp(value);
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...navigationInputs.current.map((input) => input.value)];

    // Ensure only a single digit is entered per box
    if (/^[0-9]$/.test(value) && value.length === 1) {
      newOtp[index] = value;
      onChange(newOtp.join(""));

      if (index < length - 1) {
        navigationInputs.current[index + 1].focus();
      }
    } else if (value === "") {
      newOtp[index] = "";
      onChange(newOtp.join(""));
    } else {
      e.target.value = value.slice(0, 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, length);
    const newOtp = [...navigationInputs.current.map((input) => input.value)];

    for (let i = 0; i < pastedData.length && i < length; i++) {
      newOtp[i] = pastedData[i];
      navigationInputs.current[i].value = pastedData[i];
    }
    onChange(newOtp.join(""));

    const focusIndex = Math.min(pastedData.length, length - 1);
    navigationInputs.current[focusIndex].focus();
  };

  const handleKeydown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !navigationInputs.current[index].value &&
      index > 0
    ) {
      navigationInputs.current[index - 1].focus();
    }
  };

  return (
    <div className="grid grid-cols-6 gap-[25px] w-full mx-auto md:w-[90%]">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (navigationInputs.current[index] = el)}
          className="p-3 text-center border border-[#bcbcbc] rounded-md outline-none focus:border-[#3B9DF8] placeholder-[#bcbcbc] text-[30px] font-[500] focus:shadow-md focus:shadow-[#3B9DF8] transition duration-200"
          placeholder="-"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeydown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          type="number"
        />
      ))}
    </div>
  );
};

export default OtpInput;
