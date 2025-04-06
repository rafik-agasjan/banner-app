import React from 'react';

const TextBanner: React.FC<{
  isProps: any;
}> = ({isProps}) => {

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        minHeight: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "absolute",
        top: isProps.position?.value === "top" ? 0 : "auto",
        bottom: isProps.position?.value === "bottom" ? 0 : "auto",
        backgroundColor: isProps.backgroundType?.value === "color" ? isProps.backgroundColor.value : "none",
        backgroundImage: isProps.backgroundType?.value === "image" ? `url(${isProps.backgroundImage.value})` : "none",
        backgroundSize: isProps.backgroundType?.value === "image" ? isProps.backgroundImageSize.value : "none",
        backgroundRepeat: isProps.backgroundType?.value === "image" ? isProps.backgroundImageRepeat.value : "none",
      }}
    >
      <div
        style={{
          fontSize: `${isProps.textSize?.value}px`,
          fontWeight: isProps.textWeight?.value,
          color: isProps.textColor?.value
        }}
      >
        {isProps.text?.value}
      </div>
    </div>
  );
};

export default TextBanner;