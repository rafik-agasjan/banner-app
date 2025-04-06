"use client";

import TextBanner from "../TextBanner";

const Desc: React.FC<{
    isProps: any;
    styles: any;
}> = ({isProps, styles}) => {

  return (
    <div className={styles.rightBox}>

      <TextBanner isProps={isProps} />

    </div>
  );
}

export default Desc;