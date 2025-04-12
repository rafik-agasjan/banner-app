export interface TextBannerData {
    text: {type: string, value: string};
    textColor: {type: string, value: string};
    textSize: {type: string, value: string};
    textWeight: {type: string, value: string};
    backgroundType: {type: string, data: string[], value: string};
    backgroundColor: {type: string, value: string};
    backgroundImage: {type: string, value: string};
    backgroundImageSize: {type: string, data: string[], value: string};
    backgroundImageRepeat: {type: string, data: string[], value: string};
    position: {type: string, data: string[], value: string};
}

export interface TextBannerProps {
  data: TextBannerData;
}

export const textBanner: TextBannerData = {
    text: {type: "textarea", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    textColor: {type: "color", value: "#000000"},
    textSize: {type: "number", value: "16"},
    textWeight: {type: "number", value: "500"},
    backgroundType: {type: "select", data: ["color", "image"], value: "color"},
    backgroundColor: {type: "color", value: "#FFFFFF"},
    backgroundImage: {type: "string", value: "https://th.bing.com/th/id/OIP.WCPMLsoLhFtrSzMc9UJKjAHaHa?rs=1&pid=ImgDetMain"},
    backgroundImageSize: {type: "select", data: ["contain", "cover"], value: "cover"},
    backgroundImageRepeat: {type: "select", data: ["no-repeat", "repeat"], value: "repeat"},
    position: {type: "select", data: ["top", "bottom"], value: "top"},
}