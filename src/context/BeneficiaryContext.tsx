"use client";
import { createContext, useContext, useState } from "react";

interface BeneficiaryContextType {
    beneficiaryInfo: BeneficiaryInfoType | undefined;
    getBeneficiaryInfo: (data: BeneficiaryInfoType) => void;
}

interface BeneficiaryInfoType {
    message: String,
    Beneficiary: {
        CNIC: string,
        Phone: string,
        Name: string,
        Address: string,
        PurposeOfVisit: string,
        _id: string,
        createdAt: string,
        updatedAt: string,
        __v: number
    },
    qrCode: string
}
const BeneficiaryContext = createContext<BeneficiaryContextType | undefined>(undefined);

export default function BeneficiaryContextProvider({ children }: { children: React.ReactNode }) {
    const [beneficiaryInfo, setbeneficiaryInfo] = useState<BeneficiaryInfoType | undefined>(undefined);
    const getBeneficiaryInfo = (data: BeneficiaryInfoType) => {
        setbeneficiaryInfo(data);
    }
    return <BeneficiaryContext.Provider value={{ beneficiaryInfo, getBeneficiaryInfo }}>
        {children}
    </BeneficiaryContext.Provider>;
}

export const useBeneficiaryContext = () => useContext(BeneficiaryContext);