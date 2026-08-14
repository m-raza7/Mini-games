const STORAGE_KEY = "money_recovery_tracker";

export const getRecoveries = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Failed to load recoveries:", error);
        return [];
    }
};

export const saveRecoveries = (recoveries) => {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(recoveries)
        );
    } catch (error) {
        console.error("Failed to save recoveries:", error);
    }
};

export const clearRecoveries = () => {
    localStorage.removeItem(STORAGE_KEY);
};

export const exportRecoveries = () => {
    const data = getRecoveries();

    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `money-recovery-backup-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
};

export const importRecoveries = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);

                if (!Array.isArray(data)) {
                    throw new Error("Invalid backup file");
                }

                saveRecoveries(data);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => {
            reject(new Error("Unable to read file"));
        };

        reader.readAsText(file);
    });
};