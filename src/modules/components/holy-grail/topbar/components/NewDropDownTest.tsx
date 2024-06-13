import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";

const NewDropDownTest = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="Button violet">Actions</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
        <DropdownMenu.Group>
          <DropdownMenu.Label className="DropdownMenuLabel">
            Items with dialog
          </DropdownMenu.Label>
          <DialogItem triggerChildren="Edit">
            <Dialog.Title className="DialogTitle">Edit</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Edit this record below.
            </Dialog.Description>
            <p>…</p>
          </DialogItem>

          <DialogItem triggerChildren="Delete">
            <Dialog.Title className="DialogTitle">Delete</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Are you sure you want to delete this record?
            </Dialog.Description>
          </DialogItem>
        </DropdownMenu.Group>

        <DropdownMenu.Arrow className="DropdownMenuArrow" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const DialogItem = React.forwardRef((props, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
    props;
  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <DropdownMenu.Item
          {...itemProps}
          ref={forwardedRef}
          className="DropdownMenuItem"
          onSelect={(event) => {
            event.preventDefault();
            onSelect && onSelect();
          }}
        >
          {triggerChildren}
        </DropdownMenu.Item>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          {children}
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close"></button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

export default NewDropDownTest;
