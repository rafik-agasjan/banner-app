"use client";

import { useClientTranslation } from '@/i18n';
import { useState } from 'react';
import { HexColorPicker } from "react-colorful";


const Settings: React.FC<{
    isProps: any;
    setProps: any;
    styles: any;
}> = ({isProps, setProps, styles}) => {
  const { t } = useClientTranslation();
  const [isActiveColorPanel, setIsActiveColorPanel] = useState(null);
  let timer: NodeJS.Timeout;


  return (
    <div className={styles.leftBox}>

        {Object.keys(isProps).map((key: any, index: number) => {
            if (isProps["backgroundType"].value === "color") {
                if (key === "backgroundImageRepeat") return null;
                if (key === "backgroundImageSize") return;
                if (key === "backgroundImage") return;
            }

        return (
            <div key={index} className={styles.inputBox}>
            {isProps[key].type !== "color" && isProps[key].type !== "number" &&
                <label htmlFor={key} className={styles.label}>
                    {t(key)}
                </label>
            }

            {isProps[key].type === "number" ? (
                    <div className={styles.numberBox}>
                        <span className={styles.label}>{t(key)}:</span>
                        <input
                            type="number"
                            value={isProps[key].value}
                            onChange={(e) => {
                                setProps((prev: any) => ({
                                    ...prev,
                                    [key]: {
                                    ...prev[key],
                                    value: e.target.value,
                                    },
                                }));
                            }}
                            placeholder={t(key)}
                            className={styles.inputNumber}
                        />
                    </div>
                ) : isProps[key].type === "string" ? (
                    <input
                        type="text"
                        value={isProps[key].value}
                        onChange={(e) => {
                            setProps((prev: any) => ({
                                ...prev,
                                [key]: {
                                ...prev[key],
                                value: e.target.value,
                                },
                            }));
                        }}
                        placeholder={t(key)}
                        className={styles.input}
                    />
                ) : isProps[key].type === "textarea" ? (
                    <textarea
                        value={isProps[key].value}
                        onChange={(e) => {
                            setProps((prev: any) => ({
                                ...prev,
                                [key]: {
                                ...prev[key],
                                value: e.target.value,
                                },
                            }));
                        }}
                        placeholder={t(key)}
                        className={styles.textarea}
                    />
                ) : isProps[key].type === "select" ? (
                    <select
                        value={isProps[key].value}
                        onChange={(e) => {
                            setProps((prev: any) => ({
                                ...prev,
                                [key]: {
                                ...prev[key],
                                value: e.target.value,
                                },
                            }));
                        }}
                        className={styles.select}
                    >
                        {isProps[key].data.map((item: string, index: number) => (
                            <option key={index} value={item} className={styles.option}>
                                {t(item)}
                            </option>
                        ))}
                    </select>
                ) : isProps[key].type === "color" ? (
                    <div className={styles.colorPicker}>
                        <div
                            className={styles.colorPickerPrompt}
                            onMouseLeave={() => {
                                clearTimeout(timer);
                                setIsActiveColorPanel(null);
                            }}
                            onMouseEnter={() => {
                                timer = setTimeout(() => {
                                setIsActiveColorPanel(key);
                            }, 200);
                            }}
                        >
                            <span className={styles.label}>{t(key)}:</span>
                            <div
                                className={styles.colorBox}
                                style={{background: isProps[key].value}}
                            />
                            <div className={styles.colorText}>
                                {isProps[key].value}
                            </div> 
                        </div>

                        {isActiveColorPanel === key &&
                            <div
                                className={styles.colorPickerBox}
                                onClick={() => setIsActiveColorPanel(null)}
                                onMouseLeave={() => setIsActiveColorPanel(null)}
                                onMouseEnter={() => setIsActiveColorPanel(key)}
                            >
                                <HexColorPicker
                                    color={isProps[key].value}
                                    onChange={(color) => {
                                        setProps((prev: any) => ({
                                            ...prev,
                                            [key]: {
                                                ...prev[key],
                                                value: color,
                                            },
                                        }));
                                    }}
                                />
                            </div>
                        }
                    </div>
                ) : null
            }
            </div>
        );
        })}
    </div>
  );
}

export default Settings;