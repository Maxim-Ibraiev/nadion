"use client";

import MenuMob from "@/components/MenuMob";
import Modal from "@/components/Modal";
import Button from "@/components/buttons/HederBtn";
import language from "@/language";
import { useState } from "react";

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <Button
          ariaLabel={language.menu}
          src="/icons/menu.svg"
          handleClick={() => {
            setIsOpen(true);
          }}
        />
      </div>

      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <MenuMob />
      </Modal>
    </div>
  );
}
