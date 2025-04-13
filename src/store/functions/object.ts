export const handleChange = (key: string, value: any, focus: string, set: any) => {
    set((prev: any) => ({
        ...prev,
        objects: {
            ...prev.objects,
            [focus]: {
                ...prev.objects[focus],
                data: {
                    ...prev.objects[focus].data,
                    [key]: {
                        ...prev.objects[focus].data[key],
                        value: value
                    }
                }
            }
        }
    }));
};