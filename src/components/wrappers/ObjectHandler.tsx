"use client";

import { useClientTranslation } from "@/i18n";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useObjects } from "@/store/contexts/ObjectsContext";
import { handleChange } from "@/store/functions/object";


const ObjectHandler: React.FC<{
    styles: any;
}> = ({ styles }) => {
    const { t } = useClientTranslation();
    const { _o, setObjects } = useObjects();

    let timer: NodeJS.Timeout;
    const focus = _o.focus;
    const current = _o.objects[focus].data;
    
    const [isActiveColorPanel, setIsActiveColorPanel] = useState(null);

    return (
        <div className={styles.objectHandler}>
            <div className={styles.objectHandlerTitle}>{t(focus)}</div>

            {Object.keys(current).map((key: any, index: number) => {
                if (current["backgroundType"].value === "color") {
                    if (key === "backgroundImageRepeat") return null;
                    if (key === "backgroundImageSize") return;
                    if (key === "backgroundImage") return;
                }

                return (
                    <div key={index} className={styles.inputBox}>
                        {current[key].type !== "color" && current[key].type !== "number" && (
                            <label htmlFor={key} className={styles.label}>
                                {t(key)}
                            </label>
                        )}

                        {current[key].type === "number" ? (
                            <div className={styles.numberBox}>
                                <span className={styles.label}>{t(key)}:</span>
                                <input
                                    type="number"
                                    value={current[key].value}
                                    onChange={(e) => handleChange(key, e.target.value, focus, setObjects)}
                                    placeholder={t(key)}
                                    className={styles.inputNumber}
                                />
                            </div>
                        ) : current[key].type === "string" ? (
                            <input
                                type="text"
                                value={current[key].value}
                                onChange={(e) => handleChange(key, e.target.value, focus, setObjects)}
                                placeholder={t(key)}
                                className={styles.input}
                            />
                        ) : current[key].type === "textarea" ? (
                            <textarea
                                value={current[key].value}
                                onChange={(e) => handleChange(key, e.target.value, focus, setObjects)}
                                placeholder={t(key)}
                                className={styles.textarea}
                            />
                        ) : current[key].type === "select" ? (
                            <select
                                value={current[key].value}
                                onChange={(e) => handleChange(key, e.target.value, focus, setObjects)}
                                className={styles.select}
                            >
                                {current[key].data.map((item: string, index: number) => (
                                    <option key={index} value={item} className={styles.option}>
                                        {t(item)}
                                    </option>
                                ))}
                            </select>
                        ) : current[key].type === "color" ? (
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
                                        style={{ background: current[key].value }}
                                    />
                                    <div className={styles.colorText}>{current[key].value}</div>
                                </div>

                                {isActiveColorPanel === key && (
                                    <div
                                        className={styles.colorPickerBox}
                                        onClick={() => setIsActiveColorPanel(null)}
                                        onMouseLeave={() => setIsActiveColorPanel(null)}
                                        onMouseEnter={() => setIsActiveColorPanel(key)}
                                    >
                                        <HexColorPicker
                                            color={current[key].value}
                                            onChange={(color) => handleChange(key, color, focus, setObjects)}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
};

export default ObjectHandler;
