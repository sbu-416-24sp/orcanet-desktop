import { useState } from "react";
import QRCode from "react-qr-code";
import { Input } from "../shadcn/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../shadcn/components/ui/alert-dialog";


export interface displayControllerProps {
  display: string;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
  text?: string;
}

interface FormInputContainerProps {
  className?: string;
  title: string;
  inputType: string;
  setInputValues: React.Dispatch<React.SetStateAction<FormInputType>>;
}

interface FormInputType {
  amount: number;
  receiverId: string;
  reason: string;
}

function DisplayButton({ display, setDisplay, text }: displayControllerProps) {
  return (
    <div
      className={`h-fit cursor-pointer transition-all duration-300 ${
        display === text ? "border-b-2 border-b-indigo-500" : ""
      }`}
      onClick={() => setDisplay(text ? text : "Send")}
    >
      {text}
    </div>
  );
}

function DisplayController({ display, setDisplay }: displayControllerProps) {
  return (
    <div className="flex font-semibold gap-5 ">
      <DisplayButton display={display} setDisplay={setDisplay} text="Send" />
      <DisplayButton display={display} setDisplay={setDisplay} text="Code" />
    </div>
  );
}

function TransferPanelHeader({ display, setDisplay }: displayControllerProps) {
  return (
    <div className="flex justify-between">
      <h3 className="text-stone-900 text-xl font-bold">Transfer</h3>
      <DisplayController display={display} setDisplay={setDisplay} />
    </div>
  );
}

function FormInputContainer({
  className,
  title,
  inputType,
  setInputValues,
}: FormInputContainerProps) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [inputType]: e.target.value,
    }));
  }

  return (
    <div className={className}>
      <h3 className="text-stone-900 text-md font-semibold">{title}</h3>
      <Input
        id={inputType}
        type={title === "Amount" ? "number" : "text"}
        className="border border-stone-900 rounded-lg px-3 py-5 w-full mt-2"
        onChange={onChange}
        min={0}
      />
    </div>
  );
}

function QRCodeContainer() {
  return (
    <div className="flex justify-center mt-5">
      <QRCode value="13hgriwdGXvPyWFABDX6QByyxvN8cWCgDp" />
    </div>
  );
}

function FormInputConfirmation({ amount, receiverId, reason }: FormInputType) {
  return (
    <>
      <p className="text-stone-900 text-md font-semibold mb-3">
        This action cannot be undone. Check the following transaction details:
      </p>
      <table className="border-separate border-spacing-y-2">
        <tr>
          <td className="pe-3">
            <strong>Amount: </strong>
          </td>
          <td>{amount}</td>
        </tr>
        <tr>
          <td className="pe-3">
            <strong>Receiver ID: </strong>
          </td>
          <td>{receiverId}</td>
        </tr>
        <tr>
          <td className="pe-3">
            <strong>Reason: </strong>
          </td>
          <td>{reason}</td>
        </tr>
      </table>
    </>
  );
}

function InvalidFormInput({
  invalidAmt,
  emptyId,
}: {
  invalidAmt: boolean;
  emptyId: boolean;
}) {
  return (
    <div className="text-red-500 flex flex-col gap-2 font-semibold">
      {emptyId && <p>Please enter the Receiver ID</p>}
      {invalidAmt && <p>Please enter a valid Amount</p>}
    </div>
  );
}

function showSendAlert({ amount, receiverId, reason }: FormInputType) {
  const idLength = receiverId.trim().length;
  const validInput = amount > 0 && idLength > 0;

  async function onSubmit() {}

  return (
    <AlertDialog>
      <AlertDialogTrigger className="mt-11">
        <div
          className="bg-indigo-500 text-white px-7 
          py-3 rounded-lg hover:bg-violet-500 transition-all 
          duration-500 text-sm font-semibold"
        >
          Send
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {validInput ? "Confirm Transaction" : "Error"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {validInput ? (
              <FormInputConfirmation
                amount={amount}
                receiverId={receiverId}
                reason={reason}
              />
            ) : (
              <InvalidFormInput
                invalidAmt={amount <= 0}
                emptyId={idLength === 0}
              />
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {validInput && (
            <AlertDialogAction
              className="bg-indigo-500 text-white px-7 
            hover:bg-violet-500 transition-all 
            duration-500"
              onClick={onSubmit}
            >
              Send
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function SendForm() {
  const [inpuValues, setInputValues] = useState({
    amount: 0,
    receiverId: "",
    reason: "",
  });

  const input = [
    { className: "col-span-2", title: "Receiver ID", inputType: "receiverId" },
    { title: "Amount", inputType: "amount" },
    { title: "Reason", inputType: "reason" },
  ];

  return (
    <div className="px-3 mt-7">
      <div className="grid grid-cols-2 grid-rows-2 gap-7">
        {input.map((input) => (
          <FormInputContainer
            key={input.title}
            className={input.className}
            title={input.title}
            inputType={input.inputType}
            setInputValues={setInputValues}
          />
        ))}
      </div>
      {showSendAlert(inpuValues)}
      {/* <Button
        className="mt-7 bg-indigo-500 text-white px-7"
        form="send-form"
        type="submit"
        onClick={send}
      >
        Send
      </Button> */}
    </div>
  );
}

export default function WalletTransPanel() {
  const [display, setDisplay] = useState("Send");

  return (
    <div className="border p-5 rounded-lg">
      <TransferPanelHeader display={display} setDisplay={setDisplay} />
      {display === "Send" ? <SendForm /> : <QRCodeContainer />}
    </div>
  );
}
