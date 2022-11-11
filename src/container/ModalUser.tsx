import { useEffect, useState } from "react";
import {
  ForModalUser,
  LabelType,
  ModalUserProps,
} from "../interfaces/ModalUser";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import User from "../interfaces/User";
import sweetAlert from "sweetalert";

import "../styles/ModalUser.css";

// Material UI React
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import UserServices from "../services/UserServices";

const service = new UserServices();

export const ModalUser = ({
  handleOnSubmit,
  showModal,
  closeModal,
  register,
  refreshInfo,
  idUserSelect,
}: ModalUserProps) => {
  const {
    control,
    handleSubmit,
    formState,
    formState: { errors },
    getValues,
  } = useForm<ForModalUser>({
    defaultValues: {
      Id: register?.id || "",
      NameTitular: register?.nombres_titular || "",
      LastNameTitular: register?.apellidos_titular || "",
      State: register?.estado || "",
      IdTitular: register?.cedula || "",
      Code: register?.codigo || "",
      Contract: register?.contrato || "",
      EmailTitular: register?.correo || "",
      AddressTitular: register?.direccion || "",
      CellPhone: register?.celular || "",
      Plan: register?.plan || "",
      DateStart: register?.fecha_inicio || "",
      DateFinal: register?.fecha_final || "",
      Total: register?.total || "",
      DownPayment: register?.cuota_inicial || "",
      Balance: register?.saldo || "",
      PaymentAmount: register?.valor_cuota || "",
      PaymentDate: register?.fecha_pago || "",
      IdBeneficiary: register?.cedula_beneficiario || "",
      Names: register?.nombres_b || "",
      LastNames: register?.apellidos_b || "",
      Sex: register?.sexo_b?.toLowerCase() || "",
      Email: register?.correo_b || "",
      Age: register?.edad_b || "",
      BirthDate: register?.fecha_nacimiento_b || "",
      Address: register?.direccion_b || "",
      Phone: register?.celular || "",
      Consultant: register?.consultante_b || "",
      CurrentEpisode: register?.actual_episodio || "",
      LastEpisode: register?.ultimo_episodio || "",
      TypeStudent: register?.tipoEstudiante || "",
      Induction: register?.induccion_b || "",
      Frozen: register?.congelamiento || "",
      Observations: register?.observaciones || "",
      GraduationDate: register?.fecha_graduando || "",
    },
  });

  const [labelForInput, setLabelForInput] = useState<any>({});
  const [sex, setSex] = useState("");
  const [state, setState] = useState("");
  const [typeStudent, setTypeStudent] = useState("");

  const handleSelectedState = (event: SelectChangeEvent) => {
    setState(event.target.value as string);
  };

  const handleSelectedSexuality = (event: SelectChangeEvent) => {
    setSex(event.target.value as string);
  };

  const handleSelectedTypeStudent = (event: SelectChangeEvent) => {
    setTypeStudent(event.target.value as string);
  };

  useEffect(() => {
    initialStateForFeedBack();
    if (getValues().State) {
      setState(getValues().State);
    }
    if (getValues().TypeStudent) {
      setTypeStudent(getValues().TypeStudent);
    }
    if (getValues().Sex) {
      setSex(getValues().Sex);
    }

    console.log(register);

    if (showModal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  }, []);

  const initialStateForFeedBack = () => {
    let info: any = {};
    Object.keys(getValues())?.map((field) => {
      info[field] = {
        id: LabelType.SUCCESS,
        error: false,
        variant: "outlined",
        size: "small",
      };
    });

    setLabelForInput(info);
  };

  const toggleModal = () => {
    closeModal(!showModal);
  };

  const handleChangeError = (key: string, inputs: any) => {
    inputs[key] = {
      id: LabelType.ERROR,
      variant: "outlined",
      error: true,
      size: "small",
      // helperText: "is required",
    };
  };

  const getCreateUser = async (body: User) => {
    try {
      const data: any = await service.post(body);
      return data;
    } catch (error) {
      sweetAlert({
        title: "An error has ocurred",
        text: "",
        icon: "warning",
      });
    }
  };

  const getUpdateUser = async (id: number, body: User) => {
    const data: any = await service.patch(id, body);
    return data;
  };

  const getDeleteUser = async (id: number) => {
    const data: any = await service.delete(id);
    return data;
  };

  const handleCreateUser: SubmitHandler<ForModalUser> = async (dataForm: ForModalUser) => {    
    // Realizar la creacion de usuarios here.
    try {
      const payload: User = {
        id: dataForm.Id,
        estado: dataForm.State,
        cedula: dataForm.IdTitular,
        codigo: dataForm.Code,
        contrato: dataForm.Contract,
        nombres_titular: dataForm.NameTitular.toUpperCase(),
        apellidos_titular: dataForm.LastNameTitular.toUpperCase(),
        correo: dataForm.EmailTitular.toUpperCase(),
        direccion: dataForm.AddressTitular,
        celular: dataForm.CellPhone,
        plan: dataForm.Plan,
        fecha_inicio: dataForm.DateStart,
        fecha_final: dataForm.DateFinal,
        total: dataForm.Total,
        cuota_inicial: dataForm.DownPayment,
        saldo: dataForm.Balance,
        valor_cuota: dataForm.PaymentAmount,
        fecha_pago: dataForm.PaymentDate,
        cedula_beneficiario: dataForm.IdBeneficiary,
        nombres_b: dataForm.Names.toUpperCase(),
        apellidos_b: dataForm.LastNames.toUpperCase(),
        sexo_b: dataForm.Sex.toUpperCase(),
        correo_b: dataForm.Email.toUpperCase(),
        edad_b: dataForm.Age,
        fecha_nacimiento_b: dataForm.BirthDate,
        direccion_b: dataForm.Address,
        telefono_b: dataForm.Phone,
        consultante_b: dataForm.Consultant,
        actual_episodio_b: dataForm.CurrentEpisode,
        ultimo_episodio_b: dataForm.LastEpisode,
        tipo_estudiante: dataForm.TypeStudent,
        induccion_b: dataForm.Induction,
        congelamiento: dataForm.Frozen,
        observaciones: dataForm.Observations.toUpperCase(),
        fecha_graduando: dataForm.GraduationDate,
      };

      const response: any = await getCreateUser(payload);
      refreshInfo(response, "create");
      closeModal(!showModal);

      sweetAlert({
        title: "Has been successfully created",
        text: "",
        icon: "success",
      });
    } catch (error) {
      sweetAlert({
        title: "An error has ocurred",
        text: "",
        icon: "warning",
      });
    }
  };

  const handleUpdateUser = async () => {
    try {
      const dataForm = getValues();

      const payload: User = {
        estado: dataForm.State,
        cedula: dataForm.IdTitular,
        codigo: dataForm.Code,
        contrato: dataForm.Contract,
        nombres_titular: dataForm.NameTitular.toUpperCase(),
        apellidos_titular: dataForm.LastNameTitular.toUpperCase(),
        correo: dataForm.EmailTitular.toUpperCase(),
        direccion: dataForm.AddressTitular.toUpperCase(),
        celular: dataForm.CellPhone,
        plan: dataForm.Plan,
        fecha_inicio: dataForm.DateStart,
        fecha_final: dataForm.DateFinal,
        total: dataForm.Total,
        cuota_inicial: dataForm.DownPayment,
        saldo: dataForm.Balance,
        valor_cuota: dataForm.PaymentAmount,
        fecha_pago: dataForm.PaymentDate,
        cedula_beneficiario: dataForm.IdBeneficiary,
        nombres_b: dataForm.Names.toUpperCase(),
        apellidos_b: dataForm.LastNames.toUpperCase(),
        sexo_b: dataForm.Sex.toUpperCase(),
        correo_b: dataForm.Email.toUpperCase(),
        edad_b: dataForm.Age,
        fecha_nacimiento_b: dataForm.BirthDate,
        direccion_b: dataForm.Address.toUpperCase(),
        telefono_b: dataForm.Phone,
        consultante_b: dataForm.Consultant.toUpperCase(),
        actual_episodio_b: dataForm.CurrentEpisode,
        ultimo_episodio_b: dataForm.LastEpisode,
        tipo_estudiante: dataForm.TypeStudent,
        induccion_b: dataForm.Induction,
        congelamiento: dataForm.Frozen,
        observaciones: dataForm.Observations.toUpperCase(),
        fecha_graduando: dataForm.GraduationDate,
      };

      sweetAlert({
        title: "Has been successfully updated",
        icon: "success",
      });
      const response: any = await getUpdateUser(dataForm.Id, payload);
      refreshInfo(response, "update");
    } catch (error) {
      sweetAlert({
        title: "An error has ocurred",
        icon: "warning",
      });
    }

    closeModal(!showModal);
  };

  const handleDeleteUser = async () => {
    try {
      const dataForm = getValues();
      await getDeleteUser(dataForm.Id);
      const deleteUser: any = { id: dataForm?.Id };
      refreshInfo(deleteUser, "delete");
      sweetAlert({
        title: "Has been successfully deleted",
        icon: "success",
      });
    } catch (error) {
      sweetAlert({
        title: "An error has ocurred",
        icon: "warning",
      });
    }
    closeModal(!showModal);
  };

  const validateFieldRequired = () => {
    let info = { ...labelForInput };
    let copy = { ...labelForInput };

    if (Object.keys(formState.errors).length > 0) {
      Object.keys(formState.errors)?.map((field, index) => {
        handleChangeError(field, info);
        delete copy[field];
      });

      Object.keys(copy)?.map((field, index) => {
        info[field] = {
          id: LabelType.SUCCESS,
          error: false,
          variant: "outlined",
          size: "small",
        };
      });

      setLabelForInput(info);
    }
  };

  useEffect(() => {validateFieldRequired()}, [formState.errors]);

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit(getValues()))}
      onChange={(e) => {
        // validateFieldRequired();
      }}
      className="modal"
    >
      <div>
        <div className="overlay"></div>
        <div className="modal-content-home">
          <div className="display-grid-form">
            <Card className="size-info-titular">
              <div className="title-modal-home">Info Titular</div>
              <CardContent>
                <div className="flex-container">
                  <Controller
                    name={`NameTitular`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        {...((`NameTitular` in labelForInput &&
                          labelForInput[`NameTitular`]) ||
                          {})}
                        label="NameTitular*"
                      />
                    )}
                  />
                  <Controller
                    name={`LastNameTitular`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        {...((`LastNameTitular` in labelForInput &&
                          labelForInput[`LastNameTitular`]) ||
                          {})}
                        label="LastNameTitular*"
                      />
                    )}
                  />
                  <Controller
                    name={`IdTitular`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        {...((`IdTitular` in labelForInput &&
                          labelForInput[`IdTitular`]) ||
                          {})}
                        label="IdTitular*"
                        type="number"
                      />
                    )}
                  />
                  <Controller
                    name={`Code`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 70 }}
                        {...field}
                        {...((`Code` in labelForInput &&
                          labelForInput[`Code`]) ||
                          {})}
                        label="Code"
                      />
                    )}
                  />
                  <Controller
                    name={`Contract`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 100 }}
                        {...field}
                        {...((`Contract` in labelForInput &&
                          labelForInput[`Contract`]) ||
                          {})}
                        label="Contract*"
                      />
                    )}
                  />
                  <Controller
                    name={`EmailTitular`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 260 }}
                        {...field}
                        {...((`EmailTitular` in labelForInput &&
                          labelForInput[`EmailTitular`]) ||
                          {})}
                        label="EmailTitular*"
                      />
                    )}
                  />
                  <Controller
                    name={`CellPhone`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 120 }}
                        {...field}
                        {...((`CellPhone` in labelForInput &&
                          labelForInput[`CellPhone`]) ||
                          {})}
                        label="CellPhone"
                        type="number"
                      />
                    )}
                  />
                  <Controller
                    name={`AddressTitular`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 260 }}
                        {...field}
                        {...((`AddressTitular` in labelForInput &&
                          labelForInput[`AddressTitular`]) ||
                          {})}
                        label="AddressTitular"
                      />
                    )}
                  />
                  <Controller
                    name={`Total`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 110 }}
                        {...field}
                        {...((`Total` in labelForInput &&
                          labelForInput[`Total`]) ||
                          {})}
                        label="Total*"
                        type="number"
                      />
                    )}
                  />
                  <Controller
                    name={`DownPayment`}
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 130 }}
                        {...field}
                        {...((`DownPayment` in labelForInput &&
                          labelForInput[`DownPayment`]) ||
                          {})}
                        label="DownPayment"
                        type="number"
                      />
                    )}
                  />
                  <Controller
                    name={`Balance`}
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 110 }}
                        {...field}
                        {...((`Balance` in labelForInput &&
                          labelForInput[`Balance`]) ||
                          {})}
                        label="Balance"
                        type="number"
                      />
                    )}
                  />
                  <Controller
                    name={`PaymentAmount`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 110 }}
                        {...field}
                        {...((`PaymentAmount` in labelForInput &&
                          labelForInput[`PaymentAmount`]) ||
                          {})}
                        label="PaymentAmount*"
                        type="number"
                      />
                    )}
                  />
                  <Controller
                    name={`PaymentDate`}
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        className="size-dates"
                        {...field}
                        {...((`PaymentDate` in labelForInput &&
                          labelForInput[`PaymentDate`]) ||
                          {})}
                        label="PaymentDate"
                        type="date"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                  <Controller
                    name={`Consultant`}
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        {...((`Consultant` in labelForInput &&
                          labelForInput[`Consultant`]) ||
                          {})}
                        label="Consultant"
                      />
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="size-info-student">
              <div className="title-modal-home">Info Student</div>
              <CardContent>
                <div className="flex-container">
                  <Controller
                    name={`IdBeneficiary`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 160 }}
                        {...field}
                        {...((`IdBeneficiary` in labelForInput &&
                          labelForInput[`IdBeneficiary`]) ||
                          {})}
                        label="IdBeneficiary*"
                        type="number"
                      />
                    )}
                  />
                  <Controller
                    name={`Names`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 210 }}
                        {...field}
                        {...((`Names` in labelForInput &&
                          labelForInput[`Names`]) ||
                          {})}
                        label="Names*"
                      />
                    )}
                  />
                  <Controller
                    name={`LastNames`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 170 }}
                        {...field}
                        {...((`LastNames` in labelForInput &&
                          labelForInput[`LastNames`]) ||
                          {})}
                        label="LastNames*"
                      />
                    )}
                  />
                  <Controller
                    name={`BirthDate`}
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        className="size-dates"
                        {...field}
                        {...((`BirthDate` in labelForInput &&
                          labelForInput[`BirthDate`]) ||
                          {})}
                        label="BirthDate"
                        type="date"
                        sx={{ width: 180 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                  <Controller
                    name={`DateStart`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        className="size-dates"
                        {...field}
                        {...((`DateStart` in labelForInput &&
                          labelForInput[`DateStart`]) ||
                          {})}
                        label="DateStart*"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                  <Controller
                    name={`DateFinal`}
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        className="size-dates"
                        {...field}
                        {...((`DateFinal` in labelForInput &&
                          labelForInput[`DateFinal`]) ||
                          {})}
                        label="DateFinal"
                        type="date"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                  <Controller
                    name={`Sex`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <InputLabel id="sex"> Sex* </InputLabel>
                        <Select
                          {...field}
                          {...((`Sex` in labelForInput &&
                            labelForInput[`Sex`]) ||
                            {})}
                          labelId="demo-simple-select-label"
                          label="Sex*"
                          // value={sex}
                          // onChange={handleSelectedSexuality}
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name={`Age`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 70 }}
                        {...field}
                        {...((`Age` in labelForInput && labelForInput[`Age`]) ||
                          {})}
                        label="Age*"
                        type="number"
                      />
                    )}
                  />
                  <Controller
                    name={`Address`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 200 }}
                        {...field}
                        {...((`Address` in labelForInput &&
                          labelForInput[`Address`]) ||
                          {})}
                        label="Address"
                      />
                    )}
                  />
                  <Controller
                    name={`Phone`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        {...((`Phone` in labelForInput &&
                          labelForInput[`Phone`]) ||
                          {})}
                        label="Phone*"
                        type="number"
                      />
                    )}
                  />
                  <Controller
                    name={`Plan`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 80 }}
                        {...field}
                        {...((`Plan` in labelForInput &&
                          labelForInput[`Plan`]) ||
                          {})}
                        label="Plan"
                      />
                    )}
                  />
                  <Controller
                    name={`State`}
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <InputLabel id="state"> State </InputLabel>
                        <Select
                          {...field}
                          {...((`State` in labelForInput &&
                            labelForInput[`State`]) ||
                            {})}
                          labelId="demo-simple-select-label"
                          label="State"
                          value={state}
                          onChange={handleSelectedState}
                        >
                          <MenuItem value="ACTIVO">ACTIVO</MenuItem>
                          <MenuItem value="CADUCADO">CADUCADO</MenuItem>
                          <MenuItem value="CERTIFICADO">CERTIFICADO</MenuItem>
                          <MenuItem value="DESTRATE">DESTRATE</MenuItem>
                          <MenuItem value="INACTIVO">INACTIVO</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name={`Email`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 300 }}
                        {...field}
                        {...((`Email` in labelForInput &&
                          labelForInput[`Email`]) ||
                          {})}
                        label="Email*"
                        type="email"
                      />
                    )}
                  />
                  <Controller
                    name={`CurrentEpisode`}
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: 80 }}
                        {...field}
                        {...((`CurrentEpisode` in labelForInput &&
                          labelForInput[`CurrentEpisode`]) ||
                          {})}
                        label="Episode"
                        type="number"
                      />
                    )}
                  />
                  <Controller
                    name={`LastEpisode`}
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        className="size-dates"
                        {...field}
                        {...((`LastEpisode` in labelForInput &&
                          labelForInput[`LastEpisode`]) ||
                          {})}
                        label="LastEpisode"
                        type="date"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                  <Controller
                    name={`TypeStudent`}
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <FormControl sx={{ minWidth: 80 }}>
                        <InputLabel>TypeStudent</InputLabel>
                        <Select
                          {...field}
                          {...((`TypeStudent` in labelForInput &&
                            labelForInput[`TypeStudent`]) ||
                            {})}
                          label="TypeStudent"
                          value={typeStudent}
                          onChange={handleSelectedTypeStudent}
                        >
                          <MenuItem value="Special">SPECIAL</MenuItem>
                          <MenuItem value="No Special">NO SPECIAL</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name={`Induction`}
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        className="size-dates"
                        {...field}
                        {...((`Induction` in labelForInput &&
                          labelForInput[`Induction`]) ||
                          {})}
                        label="Induction"
                        type="date"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                  <Controller
                    name={`Frozen`}
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        {...((`Frozen` in labelForInput &&
                          labelForInput[`Frozen`]) ||
                          {})}
                        label="Frozen"
                        type="date"
                        className="size-dates"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                  <Controller
                    name={`Observations`}
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        {...((`Observations` in labelForInput &&
                          labelForInput[`Observations`]) ||
                          {})}
                        label="Observations"
                      />
                    )}
                  />
                  <Controller
                    name={`GraduationDate`}
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        className="size-dates"
                        {...field}
                        {...((`GraduationDate` in labelForInput &&
                          labelForInput[`GraduationDate`]) ||
                          {})}
                        type="date"
                        label="GraduationDate"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="close-modal" onClick={toggleModal}>
            <h3>X</h3>
          </div>

          <div className="buttons-crud">
            {!register ? (
              <Button
                className="create-button"
                variant="contained"
                color="success"
                type="submit"
                onClick={handleSubmit(handleCreateUser)}
              >
                Create
              </Button>
            ) : (
              <>
                <Button
                  className="update-button"
                  variant="contained"
                  type="submit"
                  onClick={handleUpdateUser}
                >
                  Update
                </Button>
                <Button
                  className="delete-button"
                  variant="contained"
                  color="error"
                  onClick={handleDeleteUser}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalUser;
