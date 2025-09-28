import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export default function CustomDialog({
  show,
  setShow,
  title,
  handleSubmit,
  DialogBody,
}: Readonly<{
  show: boolean;
  setShow: (show: boolean) => void;
  title: string;
  handleSubmit: () => void;
  DialogBody: React.ReactNode;
}>) {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    handleSubmit(); // Call the provided handleSubmit function
    setShow(false); // Close the dialog after submission
  };
  return (
    <AlertDialog open={show}>
      <AlertDialogContent>
        <form onSubmit={onSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          {DialogBody}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShow(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
