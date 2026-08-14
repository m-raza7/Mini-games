import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    getRecoveries,
    saveRecoveries,
} from "../utils/storage";

import {
    getPaidAmount,
    getRemainingAmount,
    getRecoveryStatus,
} from "../utils/calculations";

const MoneyRecoveryContext = createContext(null);

export const MoneyRecoveryProvider = ({ children }) => {
    const [recoveries, setRecoveries] = useState(
        getRecoveries
    );

    useEffect(() => {
        saveRecoveries(recoveries);
    }, [recoveries]);

    const addRecovery = (data) => {
        const recovery = {
            id:
                crypto?.randomUUID?.() ||
                Date.now().toString(),

            personName: data.personName,
            phone: data.phone,
            address: data.address,
            amount: Number(data.amount),
            givenDate: data.givenDate,
            givenTime: data.givenTime,
            dueDate: data.dueDate,
            dueTime: data.dueTime,
            category: data.category || "Personal",
            notes: data.notes || "",

            payments: [],

            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setRecoveries((prev) => [
            recovery,
            ...prev,
        ]);

        return recovery;
    };

    const updateRecovery = (id, data) => {
        setRecoveries((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        ...data,
                        amount: Number(data.amount),
                        updatedAt:
                            new Date().toISOString(),
                    }
                    : item
            )
        );
    };

    const deleteRecovery = (id) => {
        setRecoveries((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    const addPayment = (recoveryId, payment) => {
        const newPayment = {
            id:
                crypto?.randomUUID?.() ||
                Date.now().toString(),

            amount: Number(payment.amount),
            date:
                payment.date ||
                new Date()
                    .toISOString()
                    .slice(0, 10),

            time:
                payment.time ||
                new Date().toTimeString().slice(0, 5),

            note: payment.note || "",

            createdAt: new Date().toISOString(),
        };

        setRecoveries((prev) =>
            prev.map((item) => {
                if (item.id !== recoveryId) {
                    return item;
                }

                const remaining =
                    getRemainingAmount(item);

                if (newPayment.amount > remaining) {
                    return item;
                }

                return {
                    ...item,

                    payments: [
                        ...(item.payments || []),
                        newPayment,
                    ],

                    updatedAt:
                        new Date().toISOString(),
                };
            })
        );
    };

    const deletePayment = (
        recoveryId,
        paymentId
    ) => {
        setRecoveries((prev) =>
            prev.map((item) =>
                item.id === recoveryId
                    ? {
                        ...item,
                        payments: (
                            item.payments || []
                        ).filter(
                            (payment) =>
                                payment.id !==
                                paymentId
                        ),
                    }
                    : item
            )
        );
    };

    const value = useMemo(
        () => ({
            recoveries,
            addRecovery,
            updateRecovery,
            deleteRecovery,
            addPayment,
            deletePayment,
            getPaidAmount,
            getRemainingAmount,
            getRecoveryStatus,
        }),
        [recoveries]
    );

    return (
        <MoneyRecoveryContext.Provider
            value={value}
        >
            {children}
        </MoneyRecoveryContext.Provider>
    );
};

export const useMoneyRecovery = () => {
    const context = useContext(
        MoneyRecoveryContext
    );

    if (!context) {
        throw new Error(
            "useMoneyRecovery must be used inside MoneyRecoveryProvider"
        );
    }

    return context;
};