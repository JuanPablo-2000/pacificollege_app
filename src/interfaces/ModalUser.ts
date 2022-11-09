import { SubmitHandler } from "react-hook-form";
import User from "./User";

export interface ForModalUser {
    NameTitular: string;
    LastNameTitular: string;
    State: string;
    IdTitular: string;
    Code: string;
    Contract: string;
    EmailTitular: string;
    AddressTitular: string;
    CellPhone: string;
    Plan: string;
    DateStart: Date;
    DateFinal: Date;
    Total: number;
    DownPayment: number;
    Balance: number;
    PaymentAmount: number;
    PaymentDate: Date;
    Id: number;
    IdBeneficiary: string;
    Names: string;
    LastNames: string;
    Sex: string;
    Email: string;
    Age: string;
    BirthDate: Date;
    Address: string;
    Phone: string;
    Consultant: string;
    CurrentEpisode: string;
    LastEpisode: Date;
    TypeStudent: string;
    Induction: Date;
    Frozen: Date;
    Observations: string;
    GraduationDate: Date;
}


export interface ModalUserProps {
    handleOnSubmit: SubmitHandler<ForModalUser>;
    showModal: boolean;
    closeModal: Function;
    register?: any;
    refreshInfo: (user: User, type: string) => void;
    idUserSelect: any;
}

export interface ModalStudentsProps {
    showModal: boolean;
    closeModal: Function
}

export interface InputProps {
    id: LabelType,
    error: boolean,
    variant: "outlined",
    size: "small"
}
export enum LabelType {
    SUCCESS = "outlined-basic",
    ERROR = "outlined-error"
}